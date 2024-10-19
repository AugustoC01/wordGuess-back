import { redis } from "./database";

export const setGameData = async (gameId:string, gameData:any) => {
  try {
    await redis.set(gameId, gameData, {EX: 1200});
  } catch (error) {
    console.log('error :', error);
  }
}

export const getGameData = async (gameId: string): Promise<any|null> => {
  try {
    return await redis.get(gameId)
  } catch (error) {
    console.log('error :', error);    
  }
}