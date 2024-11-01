import { redis } from "../Database/database";

//SETS GAME DATA IN REDIS
export const setGameData = async (gameId:string, gameData:any) => {
  try {
    const parseData = JSON.stringify(gameData);
    await redis.set(gameId, parseData, {EX: 1200});
  } catch (error) {
    console.log('error :', error);
  }
}

//GETS GAME DATA IN REDIS
export const getGameData = async (gameId: string): Promise<any|null> => {
  try {
    const data =  await redis.get(gameId);
    if (data) {
      const gameData = JSON.parse(data);
      return gameData;
    }
    return null;
  } catch (error) {
    console.log('error :', error);
    return null;
  }
}

//CHECKS IF AN REDIS ID EXISTS OR NOT (TRUE = 1 / FALSE = 0)
export const idExists = async (gameId:string): Promise<number> => {
  try {
    return await redis.exists(gameId);
  } catch (error) {
    console.log('error :', error);
    return 0;
  }
}