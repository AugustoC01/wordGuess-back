import { getGameData, setGameData } from "./databaseService";
import { getRandomId } from "../utils/idGenerator";
import * as wordService from "./wordService";
import { AlphabetObject } from "../types";

//THIS FN GETS THE WORD TO GUESS, SAVES THE DATA TO THE DB AND RETURNS A GAMEID
export const newGame = async (gameId?:string): Promise<string | void> => {
  try {
    if (!gameId) {
      gameId = getRandomId();
    }
    const wordToGuess = wordService.getRandomWord();
    console.log('wordToGuess :', wordToGuess);
    const gameData = wordService.setWordData(wordToGuess);
    await setGameData(gameId, gameData);
    return gameId;
  } catch (error) {
    console.log('Error: ', error);
  }
}

//THIS FN GETS A GAMEID AND THE USER INPUT WORD AND RETURNS THE ANSWER
export const getResult = async (gameId: string, userWord: string):
  Promise<{ result: number[]; disabledLetters: AlphabetObject; } | null> => {
  try {
    const wordObj = await getGameData(gameId);
    if (wordObj) {
      return wordService.getResult(userWord, wordObj);
    }
    return null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}