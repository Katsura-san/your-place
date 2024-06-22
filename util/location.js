const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = process.env.GEOCODE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://geocode.maps.co/search?q=${encodeURIComponent(
      address
    )}&api_key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.length === 0) {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = { lat: data[0].lat, lng: data[0].lon };

  return coordinates;
}

module.exports = getCoordsForAddress;
