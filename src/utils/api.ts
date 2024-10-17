import axios from "axios";
import { RAPIDAPI_KEY } from "@env";

export const generateImage = async (
  prompt: string,
  imgWidth: number,
  imgHeight: number
) => {
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/texttoimage",
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      text: prompt,
      width: imgWidth,
      height: imgHeight,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
