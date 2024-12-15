/* eslint-disable */
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../index.css';

const PieChartSA = ({ sentimentPos, sentimentNeg, sentimentNeu }) => {
  console.log("PieChart Data:", { sentimentPos, sentimentNeg, sentimentNeu }); // Log the data for validation

  // Prepare data for the Pie chart
  const data = [
    { name: 'Positive', value: sentimentPos },
    { name: 'Negative', value: sentimentNeg },
    { name: 'Neutral', value: sentimentNeu },
  ];

  const COLORS = [
    '#ADD8E6CC', // Light Blue
    '#90EE90CC', // Light Green
    '#FFB6C1CC' // Light Pink
  ];

  return (
    <div className='pc-container'>
      {sentimentPos !== undefined && sentimentNeg !== undefined && sentimentNeu !== undefined ? (
        <PieChart width={400} height={400} margin={{ top: 40 }}> {/* Move pie chart up */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value}%`} // Add the % sign to the value displayed in the tooltip
          />
          <Legend
            layout="vertical" // Vertical layout for the legend
            align="right" // Align legend to the right
            verticalAlign="middle" // Position it vertically in the middle
            wrapperStyle={{
              paddingLeft: 20,
              marginTop: 0, // Reduced margin to move the legend closer
              marginLeft: 20, // Adjust margin for right alignment
            }}
          />
        </PieChart>
      ) : (
        <h2>No data available for the pie chart.</h2>
      )}
    </div>
  );
};

export default PieChartSA;
