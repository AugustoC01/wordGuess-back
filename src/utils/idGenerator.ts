import { customAlphabet } from "nanoid/non-secure";

export const getRandomId = (): string => {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 5);
  return nanoid();
}