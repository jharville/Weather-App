import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchCity } from "../SearchCity";
import BackgroundVideoCompressed from "../../assets/Weather_App_Background_Video_Compressed.mp4";
import "./LandingPage.css";
import { isValidAddress } from "../isValidAddress";
import { useCallback } from "react";
export const LandingPage = () => {
  const [userTextInput, setUserTextInput] = useState("");
  const [, setSearchParams] = useSearchParams();
  const [userErrorMessage, setUserErrorMessage] = useState(null);
  const navigate = useNavigate();

  const updateCitySearchParam = useCallback(() => {
    return setSearchParams({ city: userTextInput });
  }, [setSearchParams, userTextInput]);

  const handleSearchSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const isValid = await isValidAddress(userTextInput);
      if (isValid) {
        updateCitySearchParam();
        navigate(`/ResultPage?city=${encodeURIComponent(userTextInput)}`);
      } else {
        setUserErrorMessage("Please Enter A Valid City");
      }
    },
    [navigate, updateCitySearchParam, userTextInput]
  );

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
              <h1>Weather App</h1>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <SearchCity
                handleSearch={handleSearchSubmit}
                userTextInput={userTextInput}
                setUserTextInput={setUserTextInput}
              />
            </form>
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
