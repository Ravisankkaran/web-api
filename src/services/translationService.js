// src/services/translationService.js
import axios from "axios";

const MYMEMORY_API = "https://api.mymemory.translated.net/get";

export const translateText = async (
  text,
  targetLanguage,
  sourceLanguage = "en"
) => {
  try {
    // Add your email for higher quota (optional)
    const email = ""; // e.g., 'your@email.com'
    const response = await axios.get(MYMEMORY_API, {
      params: {
        q: text,
        langpair: `${sourceLanguage}|${targetLanguage}`,
        ...(email && { de: email }),
      },
    });

    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText;
    } else {
      console.warn("Translation warning:", response.data.responseDetails);
      return text;
    }
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};
