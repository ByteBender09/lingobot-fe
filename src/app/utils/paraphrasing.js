import axios from "axios";
import { convertStringToJson } from "./handleText";

export const handleParaphraseInput = async (sentence) => {
  const body = { sequence: sentence.trim(), style: "Standard" };
  const endpoint = process.env.NEXT_PUBLIC_KAGGLE_ENDPOINT + "/paraphrase";
  const response = await axios.post(endpoint, body);
  const result = response.data?.data || [sentence];
  console.log(result);
  return result;
};

export const handleGetSimilarMeanings = async (sentence) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I input sentence 'The best available source for independent, widely reported, on-the-ground journalism is The Times of London.', expect output: [{"text":"The most effective source","alts":["The best source","The most efficient source","The most efficient source","The greatest source","The finest example","The premier source ","The best available"]},{"text":"of","alts":["for","is","that","in","or","about","to","concerning","within"]},{"text":"independent","alts":["autonomous","distinct","separate","autonomous","unrelated","solitary","detached"]},{"text":"widely reported","alts":["widely covered","widely circulated","widely published","extensively reported","extensively covered"]},{"text":"journalism","alts":["reporting","news","media","writing","information","research","reports"]},{"text":"is","alts":["was","remain","are","has","as","has become","seems"]},{"text":"The New York Times","alts":["The Times of New York","The NY Times","The Daily Beast","The Guardian","The Times of London."]}], RETURN SIMILAR OUTPUT WITH SENTENCE : '${sentence}'`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    const responseData = response.data.choices[0].message.content;
    return convertStringToJson(responseData);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return [];
  }
};
