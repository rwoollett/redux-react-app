import { ImageData } from "../types/imageData";

const searchImages = async (term: string): Promise<ImageData[]> => {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${term}`, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_SPLASH_KEY}`
    },
  });
  const data = await response.json();
  return data.results;
};

export default searchImages;