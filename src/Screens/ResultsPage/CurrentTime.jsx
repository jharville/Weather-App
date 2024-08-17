export const CurrentTime = () => {
  const date = new Date(Date.now());

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${hours}:${minutesFormatted} ${ampm}`;

  return <p>{formattedTime}</p>;
};
