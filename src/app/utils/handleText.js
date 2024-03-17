import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";

//Function Count Words From String
export const countWords = (content) => {
  if (!content.trim()) {
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
