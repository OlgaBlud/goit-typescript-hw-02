import axios from "axios";

const API_KEY = "4mMZYz-F-_i0OQEMk4lkmR82JLtOjavXlOqfK2VPUNk";
axios.defaults.baseURL = "https://api.unsplash.com";

axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos?client_id=${API_KEY}&query=${query}&page=${page}`
  );

  return data;
};
