/* eslint-disable */
import Graph from './Graph'; // Assuming you have a graph component
import { Chart as ChartJS } from "chart.js";
import ChartAnnotation from "chartjs-plugin-annotation";

// Registering ChartJS plugins
ChartJS.register(ChartAnnotation);

const PredictionInsight = ({ result }) => {
  if (!result) {
    return (
      <div className="app-container">
        <h4>No analysis available yet. Please analyze some news first!</h4>
      </div>
    );
  }

  // Sorting models by confidence score (highest to lowest)
  const sortedModels = Object.keys(result.confidences || {}).sort(
    (a, b) => result.confidences[b] - result.confidences[a]
  );

  // Top predictions and confidence
  const topPrediction = result.predictions[sortedModels[0]];
  const secondPrediction = result.predictions[sortedModels[1]];

  return (
    <div className="app-container">
      <h2>Prediction Insights</h2>
      <p className="caption-pi">
        Here’s how different models have evaluated the news and how confident they are in their predictions
      </p>

      {/* Display Graph */}
      {result && result.confidences && (
        <div className="graph-container">
          <Graph
            data={sortedModels.map((model) => result.confidences[model])}
            labels={sortedModels}
            predictions={result.predictions || {}}
          />
        </div>
      )}

      {/* Insight Paragraph */}
      <div className="insight-paragraph">
        <p>
          The graph above visualizes the confidence scores of different models regarding the authenticity of the news. Models with higher confidence are more certain in their assessment, while those with lower scores indicate more uncertainty.
        </p>
        <p>
          The top-performing model is <strong style={{ color: '#ff6f61' }}>{sortedModels[0]}</strong>, which is the most confident in classifying the news as{" "}
          <strong style={{ color: '#ff6f61' }}>{topPrediction.toLowerCase() === "real" ? "Real" : "Fake"}</strong>. This model’s judgment is particularly significant given its high confidence score. This is followed by <strong style={{ color: '#ff6f61' }}>{sortedModels[1]}</strong>, which also shows a high level of confidence, though slightly less than the top model.
        </p>
        <p>
          The varying predictions across models emphasize that different approaches and data processing techniques can lead to different conclusions. Higher agreement among models boosts confidence in the overall prediction.
        </p>
      </div>
    </div>
  );
};

export default PredictionInsight;
