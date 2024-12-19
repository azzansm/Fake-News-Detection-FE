/* eslint-disable */
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Graph = ({ data, labels, predictions }) => {
  // Predefined pastel colors for each model (repeating colors if there are more labels than colors)
  const pastelColors = [
    "rgba(255, 182, 193, 0.8)", // Light Pink
    "rgba(173, 216, 230, 0.8)", // Light Blue
    "rgba(144, 238, 144, 0.8)", // Light Green
    "rgba(255, 255, 186, 0.8)", // Light Yellow
    "rgba(255, 182, 193, 0.8)", // Light Coral
    "rgba(255, 222, 173, 0.8)", // Light Peach
    "rgba(219, 112, 147, 0.8)", // Pale Violet Red
    "rgba(255, 240, 245, 0.8)", // Lavender
  ];

  // Handle color repetition in case labels exceed pastelColors length
  const chartColors = pastelColors.concat(...Array(Math.ceil(labels.length / pastelColors.length)).fill(pastelColors)).slice(0, labels.length);

  // Chart data
  const chartData = {
    labels, // X-axis labels (model names)
    datasets: [
      {
        label: "Confidence Score",
        data, // Y-axis data (confidence scores)
        backgroundColor: chartColors, // Apply pastel colors
        borderColor: chartColors.map(color => color.replace("0.6", "1")), // Remove opacity for borders
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    indexAxis: "y", // Makes the bars horizontal
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const model = context.label; // Accessing the model name directly
            const confidence = context.raw; // Confidence score for the current bar

            // Get the prediction using the model name
            const prediction = predictions[model] || "No prediction available";

            // Return the tooltip string with prediction and confidence
            return `Confidence Score = ${confidence.toFixed(3)}, Prediction: ${prediction}`;
          },
        },
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 1, // Confidence scores are between 0 and 1
        title: {
          display: true,
          text: "Confidence Score",
          font: {
            family: "Poppins",
            weight: "bold",
            size: 15,
          },
          padding: { top: 20 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Models",
          font: {
            family: "Poppins",
            weight: "bold",
            size: 15,
          },
          padding: 20,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Graph;
