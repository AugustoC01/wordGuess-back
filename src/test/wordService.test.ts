import { compareWords, getLetterPositions, getRandomWord, setErrorResult, setWordData, wordExists } from "../services/wordService";
import wordsList from "../Mocks/words.json";


test('getRandomWord should return a word from wordlist', () => {
  const word = getRandomWord();
  expect(wordsList).toContain(word);
});

test('getLetterPositions should retorn the position of each letter', () => {
  const value = 'PERRO';
  const expected = { P: [0], E: [1], R: [2,3], O: [4] };
  const result = getLetterPositions(value);
  expect(result).toEqual(expected);
});

test('wordExists should throw a word error if the word does not exists', () => {
  expect(() => wordExists('invalid')).toThrow('word');
});

test('wordExists should not throw an error if the word exists', () => {
  expect(() => wordExists(wordsList[0])).not.toThrow();
});

test('setErrorResult should return an array filled with the word error code (-2)', () => {
  const value = 'PERRO';
  const result = setErrorResult('word', value);
  expect(result).toEqual([-2, -2, -2, -2, -2]);
});

test('compareWords should return an array with the result of the answer', () => {
  setWordData('PERRO');  // SETS PERRO AS THE GAME WORD
  const result = compareWords('PODER');
  expect(result).toEqual([1, 0, -1, 0, 0]);  //P: CORRECT, D: INCORRECT, E,O,R: ALMOST
});
