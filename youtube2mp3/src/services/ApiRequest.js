import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {},
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API,
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
  }
};

const fetch = async (id) => {
  requestOptions.params = { id };
  const response = await axios.request(requestOptions)
  return response;
}

export { fetch };