import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import ResultPage from "./ResultPage.jsx";

const WeatherApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/ResultPage" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default WeatherApp;
