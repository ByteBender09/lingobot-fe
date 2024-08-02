import axios from "axios";
import { emitAudioStatusChange } from "./eventeventEmitter";

export const handleTextToSpeech = async (sentence) => {
  emitAudioStatusChange(true);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        input: sentence,
        voice: "alloy",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

    const audioBuffer = response.data;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    audioContext.decodeAudioData(
      audioBuffer,
      (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        source.onended = () => {
          source.disconnect();
          audioContext.close().catch((err) => {
            console.error("Error closing AudioContext:", err);
          });
          emitAudioStatusChange(false);
        };
      },
      (error) => {
        console.error("Error decoding audio data:", error);
        emitAudioStatusChange(false);
      }
    );

    console.log("Audio playback started successfully.");
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    emitAudioStatusChange(false);
    return "";
  }
};
