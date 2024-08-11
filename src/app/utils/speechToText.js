import axios from "axios";

export const handleSpeechToText = async (blob) => {
  try {
    const formData = new FormData();
    const file = new File([blob], "audio.ogg", { type: "audio/ogg" });
    formData.append("file", file);
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error("Error calling Speech to Text API:", error);
    return "";
  }
};
