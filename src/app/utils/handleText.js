import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";

//Function Count Words From String
export const countWords = (content) => {
  // Check if content is a string
  if (typeof content !== "string" || !content.trim()) {
    return 0;
  }
  const words = content.trim().split(/\s+/);
  return words.length;
};

//Function Count Words From Doc File
export const countWordsFromDocFile = (contentArray) => {
  if (!Array.isArray(contentArray) || contentArray.length === 0) {
    return countWords(contentArray);
  }

  const combinedContent = contentArray
    .reduce((acc, curr) => {
      if (typeof curr === "string" || curr instanceof String) {
        return acc + " " + curr;
      }
      return acc;
    }, "")
    .trim();

  if (!combinedContent) {
    return 0;
  }

  const words = combinedContent.split(/\s+/);
  return words.length;
};

//Function Count Words Output
export const countWordsOutput = (output) => {
  let wordCount = 0;

  for (const arr of output) {
    for (const item of arr) {
      if (item && item.text) {
        const words = item.text.split(/\s+/);
        wordCount += words.length;
      }
    }
  }

  return wordCount;
};

const str2xml = (str) => {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
};

// Get paragraphs as javascript array
export const getParagraphsFromDocFile = (content) => {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
};

// Function to save text into clipboard
export const saveToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

// Function create file .docx from content
export const createDocx = (content) => {
  const element = document.createElement("a");
  const file = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  element.href = URL.createObjectURL(file);
  element.download = "Output.txt";
  document.body.appendChild(element);
  element.click();
};

// Function convert to json
export const convertStringToJson = (inputString) => {
  let filteredString = inputString;
  if (inputString.includes(".")) {
    filteredString = inputString.replace(".", "");
  }
  let parseArray = null;
  try {
    parseArray = JSON.parse(filteredString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return parseArray;
};
