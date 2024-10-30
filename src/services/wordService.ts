import wordsList from "../Mocks/words.json";
import normalizedWordsList from "../Mocks/normalizedWords.json";
import { LetterPositions, AlphabetObject } from "../types";

//THIS FUNCTION GETS A RANDOM WORD FROM THE WORDS LIST
export const getRandomWord = (): string => {
  const i = Math.trunc(Math.random() * wordsList.length);
  const word = wordsList[i];
  return word;
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

//THIS FUNCTION CREATES OBJECTS TO COMPARE WITH THE USER INPUT
export const setWordData = (word: string):LetterPositions => {
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

  const wordData = getLetterPositions(word);
  return wordData
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
export const compareWords = (value: string, wordObj: LetterPositions):
{result: number[], disabledLetters: AlphabetObject} => {
  const result = Array(5).fill(-1);
  const disabledLetters: AlphabetObject = {}
  const valueObj: LetterPositions = setWordData(value);
  const usedPositions = new Set(); // TO AVOID REUSIN POSITIONSIN THE WORD TO GUESS
  
  // SETS THE LETTERS THAT ARE CORRECT (SAME LETTER, SAME POSITION = 1)
  for (const letter in valueObj) {
    if (wordObj[letter]) {
      for (let i = 0; i < valueObj[letter].length; i++) {
        const pos = valueObj[letter][i];
        if (wordObj[letter].includes(pos)) {
          result[pos] = 1; // CORRECT LETTER
          usedPositions.add(pos); // AVOIDS TO REUSE THAT POSITION
          wordObj[letter] = wordObj[letter].filter(p => p !== pos); // REMOVES THE POSITION FROM wordObj
          valueObj[letter] = valueObj[letter].filter(p => p !== pos); // REMOVES THE POSITION FROM valueObj
        }
      }
    }
  }

  // SETS THE LETTERS THAT ARE ALMOST CORRECT (SAME LETTER, NOT SAME POSITION = 0)
  for (const letter in valueObj) {
    if (wordObj[letter]) {
      for (let i = 0; i < valueObj[letter].length; i++) {
        const pos = valueObj[letter][i];
        const availablePositions = wordObj[letter].filter(p => !usedPositions.has(p)); // AVOIDS USED POSITIONS

        if (availablePositions.length > 0 && result[pos] === -1) {
          result[pos] = 0; // SETS A 0 IN THAT POSITION
          usedPositions.add(availablePositions[0]); // AVOIDS TO REUSE THAT POSITION
          wordObj[letter] = wordObj[letter].filter(p => p !== availablePositions[0]); // REMOVES THE POSITION FROM availablePositions
          valueObj[letter] = valueObj[letter].filter(p => p !== pos); // REMOVES THE POSITION FROM wordObj
        }
      }
    }
  }
  //SETS THE DISABLED LETTERS
  for (const letter in valueObj) {
    if (valueObj[letter].length !== 0) {
        disabledLetters[letter] = -1;
    }
  }

  return {result, disabledLetters};
};

//THIS FUNCTION RECEIVES THE USER INPUT AND HANLDES THE RESPONSE
export const getResult = (value: string, wordObj: LetterPositions): 
{ result: number[], disabledLetters: AlphabetObject } => {
  try {
    wordExists(value);
    return compareWords(value, wordObj);
  } catch (e: any) {
    const result = setErrorResult(e.message, value);
    return { result, disabledLetters: {} };
  }
};