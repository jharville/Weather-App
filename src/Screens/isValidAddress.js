/**
 * isValidAddress is simple utility file that verifies that the city/address pulled form the
 * URL exists. This function sends a request to the Nominatim API to search for the given address.
 * It returns `true` if the address exists in the response, and `false` otherwise.
 * If an error occurs during the fetch operation or data processing, it logs the error and returns `false`.
 */

export const isValidAddress = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
    );
    const data = await response.json();
    return data.length > 0;
  } catch (error) {
    console.error("Error validating address:", error);
    return false;
  }
};
