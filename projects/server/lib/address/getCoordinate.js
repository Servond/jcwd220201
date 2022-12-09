const axiosInstance = require("./api");

const getCoordinate = async (location) => {
  // Encode location value for API call
  const encodedLocation = encodeURIComponent(location);

  // Determine location type
  const type = location.split(" ")[0].toLowerCase();
  const locationType =
    type === "kota" ? "city" : type === "kabupaten" ? "county" : null;
  const locationCategory = "place";

  // OpenCage API call
  const {
    data: { results },
  } = await axiosInstance.get(
    `/geocode/v1/json?key=${process.env.OPENCAGE_API_KEY}&q=${encodedLocation}&countrycode=id&no_annotations=1`
  );

  // Filter results
  const filteredResults = results.find((result) => {
    const locationDetails = result.components;
    return (
      locationDetails._category === locationCategory &&
      locationDetails._type === locationType
    );
  });

  // Return null if no matching result
  if (!filteredResults) {
    return null;
  }

  // Return coordinates if match found
  const { lat, lng } = filteredResults.geometry;
  return `${lat}, ${lng}`;
};

module.exports = getCoordinate;
