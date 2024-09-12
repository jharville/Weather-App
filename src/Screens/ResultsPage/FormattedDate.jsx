const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (dateString) => {
  if (!dateString) {
    console.error("Invalid date string provided:", dateString);
    return "Invalid date"; // or return null if you prefer
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object created from string:", dateString);
    return "Invalid date"; // or return null if you prefer
  }

  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return `${formattedDate.replace(/\d+/, day)}${suffix}`;
};

/**
 * Formats the date from ISO 8601 format format (2024-10-19) to Oct 19th 2024
 *
 * @param {Object} props - Component Properties. Accepts a date object.
 * @param {string} props.date - The date string in YYYY-MM-DD format to be formatted.
 * @returns {JSX.Element} The formatted date wrapped in a paragraph element.
 */
export const FormattedDate = ({ acceptedDate }) => {
  return <p>{formatDate(acceptedDate)}</p>;
};
