import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "./Screens/LandingPage/LandingPage.jsx";
import { ResultPage } from "./Screens/ResultsPage/ResultPage.jsx";
import { useEffect } from "react";

const WeatherApp = () => {
  useEffect(() => {
    document.title = "Weather App";
  }, []);

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
