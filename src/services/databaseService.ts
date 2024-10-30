import { redis } from "../Database/database";

export const setGameData = async (gameId:string, gameData:any) => {
  try {
    const parseData = JSON.stringify(gameData);
    await redis.set(gameId, parseData, {EX: 1200});
  } catch (error) {
    console.log('error :', error);
  }
}

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

export const idExists = async (gameId:string): Promise<number> => {
  try {
    return await redis.exists(gameId);
  } catch (error) {
    console.log('error :', error);
    return 0;
  }
}