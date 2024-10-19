import request from 'supertest';
import { app } from '../server';
import wordList from "../Mocks/words.json"

const wordRouter = "/api/word"

test('GET /api/word should return a word from wordList', async () => {
  const response = await request(app)
  .get(wordRouter)

  expect(response.statusCode).toBe(200)
  expect(wordList).toContain(response.body)
  
})


test('POST /api/word should return the answer', async () => {
  const response = await request(app)
    .post(wordRouter)
    .send({ value: wordList[0] });

  expect(response.statusCode).toBe(200);
  expect(response.body.result).not.toBe([-2,-2,-2,-2,-2]) // EXPECTED RESPONSE TYPE

});

test('POST /api/word should return error code 400  if it gets an empty array', async () => {
  const response = await request(app)
    .post('/api/word/')
    .send({ value: '' });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe('Missing required word!');
});
