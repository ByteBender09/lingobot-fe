import axios from "axios";
import { convertStringToJson } from "./handleText";
import { LISTSTYLES, MODELTYPE } from "../const";

export const handleParaphraseInput = async (sentence, style, modelType) => {
  let processedEndpoint =
    style !== LISTSTYLES[0] && style !== LISTSTYLES[1]
      ? process.env.NEXT_PUBLIC_MISTRAL_ENDPOINT + "/mistral"
      : modelType === MODELTYPE.T5
      ? process.env.NEXT_PUBLIC_KAGGLE_ENDPOINT + "/paraphrase"
      : process.env.NEXT_PUBLIC_MISTRAL_ENDPOINT + "/mistral";

  console.log(processedEndpoint);
  const body = { sequence: sentence.trim(), style: style };
  const response = await axios.post(processedEndpoint, body);
  const result = response.data?.data || [sentence];
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
            content: `I input sentence 'The best available source for independent, widely reported, on-the-ground journalism is The New York Times.', expect output: [{"text":"The best available source","alts":["The best source","The most efficient source","The most efficient source","The greatest source","The finest example"]},{"text":"for","alts":["of","is","that","in","or"]},{"text":"independent","alts":["autonomous","distinct","separate","autonomous","unrelated"]},{"text":"widely reported","alts":["widely covered","widely circulated","widely published"]},{"text":"journalism","alts":["reporting","news","media","writing","information"]},{"text":"is","alts":["was","remain","are","has","as"]},{"text":"The New York Times.","alts":["The Times of New York.","The NY Times.","The Daily Beast.","The Guardian.","The Times of London."]}], RETURN EXACTLY SIMILAR OUTPUT WITH SENTENCE: '${sentence}' and please no replace total sentence, just replace word or phrase and keep the punctuation associated with the last phrase without changing it like {"text":"you?","alts":["him?","it?","me?"]} or {"text":"my thesis outcome.","alts":["my research result.","my dissertation conclusion."]}`,
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
    return [{ text: sentence, alts: [] }];
  }
};
