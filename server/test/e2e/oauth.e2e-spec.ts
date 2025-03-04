import { OAuthController } from '@app/immich';
import { api } from '@test/api';
import { db } from '@test/db';
import { errorStub } from '@test/fixtures';
import { testApp } from '@test/test-utils';
import request from 'supertest';

describe(`${OAuthController.name} (e2e)`, () => {
  let server: any;

  beforeAll(async () => {
    [server] = await testApp.create();
  });

  afterAll(async () => {
    await testApp.teardown();
  });

  beforeEach(async () => {
    await db.reset();
    await api.authApi.adminSignUp(server);
  });

  describe('POST /oauth/authorize', () => {
    beforeEach(async () => {
      await db.reset();
    });

    it(`should throw an error if a redirect uri is not provided`, async () => {
      const { status, body } = await request(server).post('/oauth/authorize').send({});
      expect(status).toBe(400);
      expect(body).toEqual(errorStub.badRequest(['redirectUri must be a string', 'redirectUri should not be empty']));
    });
  });
});
