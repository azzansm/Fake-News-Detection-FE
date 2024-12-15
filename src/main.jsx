import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from './App';
import './index.css'; // Import styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // Main.jsx
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import App from './App'; // Home component
// import PredictionInsight from './utils/PredictionInsight';
// // import SentimentAnalysis from './SentimentAnalysis';

// const Main = () => {
//   return (
//     <BrowserRouter>
//       <header className="toolbar">
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/prediction-insight">Prediction Insights</Link>
//           {/* <Link to="/sentiment-analysis">Sentiment Analysis</Link> */}
//         </nav>
//       </header>

//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/prediction-insight" element={<PredictionInsight />} />
//         {/* <Route path="/sentiment-analysis" element={<SentimentAnalysis />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Main;
