import { useState, useEffect } from "react";

const ampmStyling = {
  paddingLeft: "7px",
  fontSize: "18px",
};

export const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clockCounter = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockCounter);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const formattedTime = (
    <>
      {formattedHours}:{formattedMinutes}:{formattedSeconds}
      <span style={ampmStyling}>{ampm}</span>
      {/* <span> doesn't introduce any line breaks as oppossed to <div>, making it ideal 
      for applying styles or scripts to small parts of text within a larger block of content.  */}
      {/* Also, \u00A0 is syntax for "non-breaking space" in a template literal. */}
    </>
  );

  return <p>{formattedTime}</p>;
};
