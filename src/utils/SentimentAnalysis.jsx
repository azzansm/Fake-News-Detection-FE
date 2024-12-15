/* eslint-disable */
import React from 'react';
import PieChartSA from './PieChartSA';  // Import PieChart component

const SentimentAnalysis = ({ sentimentData }) => {
  // Destructure the sentiment data with default values
  const {
    sentimentPos = 0,
    sentimentNeg = 0,
    sentimentNeu = 0,
    compound = 0, // Use 'compound' directly from the sentimentData
  } = sentimentData || {}; // Ensure default values for undefined data

  // Convert decimal values to percentages
  const sentimentPosPercent = sentimentPos * 100;
  const sentimentNegPercent = sentimentNeg * 100;
  const sentimentNeuPercent = sentimentNeu * 100;

  console.log("Sentiment Data:", sentimentData); // Log to check if it's undefined

  // Function to determine the meaning of sentiment based on the compound score
  const getSentimentMeaning = (compound) => {
    if (compound >= 0.05) return 'Positive, which indicates that the text has a positive sentiment overall';
    if (compound <= -0.05) return 'Negative, which indicates that the text has a negative sentiment overall';
    return 'Neutral, which means the sentiment is balanced and doesn\'t lean towards positive or negative';
  };

  // Determine sentiment description based on compound score
  const sentimentDescription = compound >= 0.05
    ? 'positive sentiment'
    : compound <= -0.05
    ? 'negative sentiment'
    : 'neutral sentiment';

  return (
    <div className='app-container'>
      <h3>Sentiment Analysis Breakdown</h3>
      <p className='caption-pi'>
        The sentiment of this news is <strong style={{ color: '#ff6f61' }}>{getSentimentMeaning(compound)}</strong>
      </p>

      <PieChartSA
        sentimentPos={sentimentPosPercent}
        sentimentNeg={sentimentNegPercent}
        sentimentNeu={sentimentNeuPercent}
      />
      
      <p className='caption-pi'>
        This sentiment analysis is conducted using the VADER Sentiment Analysis tool, which classifies text based on its "compound" score. A positive compound score indicates a predominantly positive sentiment, while a negative score reflects a negative sentiment. A score close to zero suggests a neutral sentiment, where the text does not express a clear bias towards positive or negative emotions. In this case, the compound score is <strong style={{ color: '#ff6f61' }}>{compound.toFixed(2)}</strong>, indicating a <strong style={{ color: '#ff6f61' }}>{sentimentDescription}</strong>.
      </p>
    </div>
  );
};

export default SentimentAnalysis;
