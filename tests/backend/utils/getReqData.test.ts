import { createMocks } from 'node-mocks-http';

import getReqData from '@utils/getReqData.util';

describe('getReqData', () => {
  it('should return an object with params, query and body', () => {
    const { req } = createMocks({
      method: 'PUT',
      params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      query: { limit: 10 },
      body: {
        name: 'test-name',
        description: 'test-description',
        url: 'http://test.com',
      },
    });

    expect(getReqData(req)).toEqual({
      params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      query: { limit: 10 },
      body: {
        name: 'test-name',
        description: 'test-description',
        url: 'http://test.com',
      },
    });
  });

  it('should return an object with params and query', () => {
    const { req } = createMocks({
      method: 'GET',
      params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      query: { limit: 10 },
    });

    expect(getReqData(req)).toEqual({
      params: { id: '5f531863-3774-4704-af3b-a2f54ec833a5' },
      query: { limit: 10 },
    });
  });

  it('should return an object with body', () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'test-name',
        description: 'test-description',
        url: 'http://test.com',
      },
    });

    expect(getReqData(req)).toEqual({
      body: {
        name: 'test-name',
        description: 'test-description',
        url: 'http://test.com',
      },
    });
  });
});
