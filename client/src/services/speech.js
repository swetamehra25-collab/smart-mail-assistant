
export const speakMessage = (message) => {
  const speech = new SpeechSynthesisUtterance(message);

  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};

export const pauseSpeech = () => {
  window.speechSynthesis.pause();
};

export const resumeSpeech = () => {
  window.speechSynthesis.resume();
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};
