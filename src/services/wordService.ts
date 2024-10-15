import wordsList from "../Mocks/words.json";
import normalizedWordsList from "../Mocks/normalizedWords.json";
import { LetterPositions, AlphabetObject } from "../types";

let wordObj: LetterPositions;
let wordLetters: string[];

//THIS FUNCTION GETS A RANDOM WORD FROM THE WORDS LIST
export const getRandomWord = (): string => {
  let i = Math.trunc(Math.random() * wordsList.length);
  const word = wordsList[i];
  setWordData(word);
  return word;
};

//THIS FUNCTION CREATES OBJECTS TO COMPARE WITH THE USER INPUT
export const setWordData = (word: string) => {
  const accentMap:{[index: string] : string} = {
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U'
  };
  const tildeRegex: RegExp = /[ÁÉÍÓÚ]/;

  //REPLACE THE LETTERS WITH SYMBOLS
  if (tildeRegex.test(word)) {
    word = word.replace(/[ÁÉÍÓÚ]/g, (matched) => accentMap[matched]);
  }

  wordObj = getLetterPositions(word);
  wordLetters = Object.keys(wordObj);
};

//THIS FUNCTION CREATES THE OBJECTS TO COMPARE THE WORDS
export const getLetterPositions = (value: string): LetterPositions => {
  const splitValue = [...value];
  const valueObj = splitValue.reduce((acc, letter, i) => {
    acc[letter] = acc[letter] || [];
    acc[letter].push(i);
    return acc;
  }, {} as LetterPositions);
  return valueObj;
};

//THIS FUNCTION CHECKS IF THE USER INPUT VALUE EXISTS IN THE WORDS LIST
export const wordExists = (value: string): void => {
  const exists = normalizedWordsList.includes(value);
  if (!exists) throw Error("word");
};

//THIS FUNCTION HANDLES THE ERROR VALUES(-2 CASE WORD DONT EXIST)
export const setErrorResult = (errorName: string, value: string): number[] => {
  let errorCode: number = 0;
  switch (errorName) {
    case "word":
      errorCode = -2;
      break;
  }
  const result: number[] = Array.from(
    { length: value.length },
    () => errorCode
  );
  return result;
};

//THIS FUNCTION COMPARES THE WORD TO GUESS VS THE USER INPUT
export const compareWords = (value: string, disabledLetters: AlphabetObject): {result: number[], disabledLetters: AlphabetObject} => {
  const valueObj = getLetterPositions(value);
  const valueLetters = Object.keys(valueObj);
  const valuePositions = Object.values(valueObj);
  const newdisabledLetters = {...disabledLetters};

  const result = new Array(value.length).fill(-1);
  for (let i = 0; i < valueLetters.length; i++) {
    let letter = valueLetters[i];
    let letterPositions = valuePositions[i];
    let repeated = 0;

    if (wordLetters.includes(letter)) {
      letterPositions.forEach((index) => {
        if (wordObj[letter].some((value) => value == index)) {
          result[index] = 1;
        } else {
          if (wordObj[letter].length > letterPositions.length) {
            if (repeated < letterPositions.length) {
              repeated = repeated + 1;
              result[index] = 0;
            }
          } else {
            if (repeated < wordObj[letter].length) {
              repeated = repeated + 1;
              result[index] = 0;
            }
          }
        }
      });
    } else {
      newdisabledLetters[letter] = -1;
    }
  }
  return {result, disabledLetters: newdisabledLetters};
};

//THIS FUNCTION RECEIVES THE USER INPUT AND HANLDES THE RESPONSE
export const getResult = (
  value: string, disabledLetters: AlphabetObject
): { result: number[], disabledLetters: AlphabetObject } => {
  try {
    wordExists(value);
    return compareWords(value, disabledLetters);
  } catch (e: any) {
    const result = setErrorResult(e.message, value);
    return { result, disabledLetters };
  }
};