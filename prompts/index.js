const defaultPrompt = require("./default");
const datingPrompt = require("./dating");
const textingPrompt = require("./texting");
const roastPrompt = require("./roast");
const careerPrompt = require("./career");
const studyPrompt = require("./study");

function getPrompt(mode) {
  switch (mode) {
    case "dating":
      return datingPrompt;

    case "texting":
      return textingPrompt;

    case "roast":
      return roastPrompt;

    case "career":
      return careerPrompt;

    case "study":
      return studyPrompt;

    default:
      return defaultPrompt;
  }
}

module.exports = getPrompt;