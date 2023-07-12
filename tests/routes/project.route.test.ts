import { createMocks } from 'node-mocks-http';
import { post } from '@/backend/routes/project.route';

describe('/api/projects', () => {
  it('should return the new project with status code 201', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'test-name',
        description: 'test-description',
        url: 'test-url',
      },
    });

    await post(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual({
      data: {
        id: expect.any(String),
        name: 'test-name',
        description: 'test-description',
        url: 'test-url',
        lastMaintenance: null,
        nextMaintenance: expect.any(String),
        createdAt: expect.any(String),
      },
      error: null,
    });
  });
});
