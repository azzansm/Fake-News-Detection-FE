/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './index.css'; // Import styles
import Modal from './utils/Modal'; // Modal component
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import routing components
import PredictionInsight from './utils/PredictionInsight';
import SentimentAnalysis from './utils/SentimentAnalysis';

const App = () => {
  const [news, setNews] = useState(""); // News input state
  const [result, setResult] = useState(null); // Result state
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const analysisRef = useRef(null); // Ref for the analysis result section

  const title = "Fake News Detection";
  const subtitle = "No More Fake News, Just Straight-Up Facts";

  // Handle news input
  const handleNewsChange = (event) => {
    setNews(event.target.value);
  };

  // Analyze the news
  const analyzeNews = async () => {
    if (news.trim() === "") {
      setModalMessage("Please enter some news.");
      setShowModal(true);
      return;
    }

    try {
      // Send request to backend
      const response = await axios.post("http://34.232.63.72:8000/predict", { news_text: news });
      setResult(response.data); // Store result from backend
      // Scroll to analysis result section
      if (analysisRef.current) {
        analysisRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      setModalMessage("Error analyzing the news.");
      setShowModal(true);
    }
  };

  // Get the model with the highest confidence
  const getHighestConfidence = () => {
    if (!result) return { model: "", confidence: 0, prediction: "" };
    const { confidences, predictions } = result;
    const highest = Object.keys(confidences).reduce((acc, model) => {
      if (confidences[model] > acc.confidence) {
        return { model, confidence: confidences[model], prediction: predictions[model] };
      }
      return acc;
    }, { model: "", confidence: 0, prediction: "" });
    return highest;
  };

  const highestConfidence = getHighestConfidence();

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Calculate word count
  const wordCount = news.trim() ? news.trim().split(/\s+/).length : 0;

  return (
    <BrowserRouter>
      <header className="toolbar">
        <nav>
          <Link to="/">Home</Link>
          <Link to={result ? "/prediction-insight" : "#"} 
            style={{ pointerEvents: result ? "auto" : "none", color: result ? "inherit" : "gray" }}>
            Prediction Insights
          </Link>
          <Link to={result && result.sentiment ? "/sentiment-analysis" : "#"} 
            style={{ pointerEvents: result && result.sentiment ? "auto" : "none", color: result && result.sentiment ? "inherit" : "gray" }}>
            Sentiment Analysis
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <h1 className="typing-title">{title}</h1>
            <h2 className="typing-subtitle">{subtitle}</h2>
            <textarea
              className="news-input"
              value={news}
              onChange={handleNewsChange}
              placeholder="Paste your news here.."
            />

            <button className="analyze-button" onClick={analyzeNews}>
              Analyze
            </button>

            {result && (
              <div className="result" ref={analysisRef}>
                <h2>Analysis Result</h2>
                <p>
                  This news has been classified as <strong style={{ color: '#ff6f61' }}>{highestConfidence.prediction}</strong> based on predictions from the <strong style={{ color: '#ff6f61' }}>{highestConfidence.model}</strong> model, with a confidence score of <strong style={{ color: '#ff6f61' }}>{highestConfidence.confidence.toFixed(2)}</strong>.
                </p>

                {result.sentiment && (
                  <p>
                    The sentiment of this news is <strong style={{ color: '#ff6f61' }}>{result.sentiment[0]}</strong>.
                  </p>
                )}

                <div>
                  <p className="news-breakdown">News Breakdown</p>
                  <p
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                    dangerouslySetInnerHTML={{ __html: result.highlighted || "<p>No highlighted content available.</p>" }}
                  />
                </div>

                {/* Highlight Colors */}
                {result.color_meanings && (
                  <div className="color-legend">
                    {Object.keys(result.color_meanings).map((key) => (
                      <div key={key} style={{ marginBottom: "10px", marginTop: "10px" }}>
                        <span
                          className={key}
                          style={{
                            padding: "1px 10px",
                            borderRadius: "3px",
                            backgroundColor: result.color_meanings[key].split(":")[1],
                          }}
                        >
                          {result.color_meanings[key].split(":")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {showModal && <Modal message={modalMessage} onClose={closeModal} />}
          </div>          
        } />
        
        <Route path="/prediction-insight" element={<PredictionInsight result={result} />} />
        <Route path="/sentiment-analysis" element={
          result && result.sentiment ? (
            <SentimentAnalysis 
              sentimentData={{
                compound: result.sentiment[1],
                sentimentPos: result.sentiment[2],
                sentimentNeg: result.sentiment[3],
                sentimentNeu: result.sentiment[4]
              }} 
            />
          ) : (
            <h4 className="app-container">Sentiment data not available</h4>
          )
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
