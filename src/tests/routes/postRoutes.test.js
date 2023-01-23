import request from 'supertest';
import dbConnection from '../../db/index.js';
import CONSTANTS from '../../constants.js';
import app from '../../../app.js';

const appV1 = '/api/v1';

describe('Todo EndPoints', () => {
  let user1 = {};
  let user2 = {};
  let post = {};
  let postId = '';
  let agent1 = '';
  let agent2 = '';
  let session1 = '';
  let session2 = '';
  beforeAll(async () => {
    await dbConnection.clear();
    await dbConnection.connect();
    user1 = {
      username: 'test1@gmail.com',
      email: 'test1@gmail.com',
      password: '123456789',
    };
    user2 = {
      username: 'test2@gmail.com',
      email: 'test2@gmail.com',
      password: '123456789',
    };
    agent1 = request.agent(app);
    agent2 = request.agent(app);
    await agent1.post(`${appV1}/signup`).send(user1);
    await agent2.post(`${appV1}/signup`).send(user2);
    const user1Result = await agent1.post(`${appV1}/login`).send(user1);
    session1 = user1Result.headers['set-cookie'];
    const user2Result = await agent2.post(`${appV1}/login`).send(user2);
    session2 = user2Result.headers['set-cookie'];
    await agent1.set('set-cookie', [session1]);
    await agent2.set('set-cookie', [session2]);
  });
  afterAll(async () => {
    await dbConnection.disConnect();
  });

  describe('Post Endpoints', () => {
    it('GET /posts, Login required to view the posts ( /posts )', async () => {
      const result = await request(app).get(`${appV1}/posts`);
      //   expect(result.body.size).toBe(0);
      expect(result.statusCode).toBe(403);
      expect(result.body.message).toBe(CONSTANTS.TOKEN_REQUIRED_FAILURE);
      //   expect(result.body.todos).toBeDefined();
    });
    // await agent2.set('set-cookie', [session2])
    it('GET /posts, Total posts must be zero', async () => {
      const result = await agent1.get(`${appV1}/posts`);
      expect(result.body.size).toBe(0);
      expect(result.body.size).toBeDefined();
      expect(result.body.posts).toBeDefined();
    });
    it('POST /posts, Title required for creating a todo', async () => {
      const result = await agent1.post(`${appV1}/posts`).send({});
      // console.log(result.body);
      expect(result.body.message).toBe(CONSTANTS.POST_TITLE_REQUIRED_FAILURE);
    });
    it('POST /posts, Body required for creating a post', async () => {
      const result = await agent1
        .post(`${appV1}/posts`)
        .send({ title: 'My post' });
      // console.log(result.body);
      expect(result.body.message).toBe(CONSTANTS.POST_BODY_REQUIRED_FAILURE);
    });
    it('POST /posts, Create a post', async () => {
      const result = await agent1
        .post(`${appV1}/posts`)
        .send({ title: 'My post', body: 'My post body' });
      expect(result.body.message).toBe(CONSTANTS.POST_CREATED_SUCCESS);
    });
    it('GET /posts, Total posts must be 1', async () => {
      const result = await agent1.get(`${appV1}/posts`);
      expect(result.body.size).toBe(1);
      expect(result.body.size).toBeDefined();
      expect(result.body.posts).toBeDefined();
      postId = result.body.posts[0]._id;
      // console.log({ postId });
    });
    it('DELETE /posts, Unauthorised! Could not delete other user POST', async () => {
      const result = await agent2.delete(`${appV1}/posts/${postId}`);
      // console.log(result.body);
      expect(result.body.message).toBe(CONSTANTS.UNAUTHORISED);
    });
  });
});
