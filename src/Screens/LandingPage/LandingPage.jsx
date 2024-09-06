import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchCity } from "../SearchCity";
import BackgroundVideoCompressed from "../../assets/Weather_App_Background_Video_Compressed.mp4";
import "./LandingPage.css";
import { isValidAddress } from "../isValidAddress";

export const LandingPage = () => {
  const [userTextInput, setUserTextInput] = useState("");
  const [, setSearchParams] = useSearchParams();
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const navigateToResult = useNavigate();

  const handleSearchSubmit = async (event) => {
    const isValid = await isValidAddress(userTextInput.trim());
    if (isValid) {
      event.preventDefault();
      setSearchParams({ city: userTextInput.trim() });
      navigateToResult(
        `/ResultPage?city=${encodeURIComponent(userTextInput.trim())}`
      );
    } else {
      setUserErrorMessage("Please Enter A Valid City");
    }
  };

  const handleEnterPressSubmit = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const isValid = await isValidAddress(userTextInput.trim());
      if (isValid) {
        setSearchParams({ city: userTextInput.trim() });
        navigateToResult(
          `/ResultPage?city=${encodeURIComponent(userTextInput.trim())}`
        );
      } else {
        setUserErrorMessage("Please Enter A Valid City");
      }
    }
  };

  const handleSuggestionClick = async () => {
    const isValid = await isValidAddress(userTextInput.trim());
    if (isValid) {
      setSearchParams({ city: userTextInput.trim() });
      navigateToResult(
        `/ResultPage?city=${encodeURIComponent(userTextInput.trim())}`
      );
    } else {
      setUserErrorMessage("Please Enter A Valid City");
    }
  };

  return (
    <>
      <div className="background-Landing">
        <video
          autoPlay
          loop
          muted
          className="video-Landing"
          src={BackgroundVideoCompressed}
          type="video/mp4"
        />
      </div>
      <div id="entire-landing-page">
        <div id="flex-box-Landing">
          <div className="weather-app-container-Landing">
            <div id="app-title">
              <h1>Weather Getter</h1>
            </div>
            <SearchCity
              handleSearchSubmit={handleSearchSubmit}
              handleEnterPressSubmit={handleEnterPressSubmit}
              handleSuggestionClick={handleSuggestionClick}
              userTextInput={userTextInput}
              setUserTextInput={setUserTextInput}
            />
            <div>
              {userErrorMessage && (
                <h1 id="error-message-landing">{userErrorMessage}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
