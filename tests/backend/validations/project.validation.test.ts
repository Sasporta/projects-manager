import * as projectValidations from '@validations/project.validation';

describe('project.validation', () => {
  describe('projectValidations.getOne', () => {
    it('should be valid', async () => {
      const data = {
        params: {
          id: '5f531863-3774-4704-af3b-a2f54ec833a5',
        },
      };

      const { error } = projectValidations.getOne.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - params.id is required', async () => {
      const data = {
        params: {},
      };

      const { error } = projectValidations.getOne.validate(data);

      expect(error?.message).toBe('"params.id" is required');
    });
  });

  describe('projectValidations.post', () => {
    it('should be valid', async () => {
      const data = {
        body: {
          name: 'test',
          description: 'test',
          url: 'http://test.com',
        },
      };

      const { error } = projectValidations.post.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - body.url is required', async () => {
      const data = {
        body: {
          name: 'test',
          description: 'test',
        },
      };

      const { error } = projectValidations.post.validate(data);

      expect(error?.message).toBe('"body.url" is required');
    });

    it('should be invalid - body.invalid is not allowed', async () => {
      const data = {
        body: {
          name: 'test',
          description: 'test',
          url: 'http://test.com',
          invalid: 'invalid',
        },
      };

      const { error } = projectValidations.post.validate(data);

      expect(error?.message).toBe('"body.invalid" is not allowed');
    });
  });

  describe('projectValidations.put', () => {
    it('should be valid', async () => {
      const data = {
        params: {
          id: '5f531863-3774-4704-af3b-a2f54ec833a5',
        },
        body: {
          name: 'test',
          description: 'test',
          url: 'http://test.com',
        },
      };

      const { error } = projectValidations.put.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - params.id is required', async () => {
      const data = {
        params: {},
        body: {
          name: 'test',
          description: 'test',
          url: 'http://test.com',
        },
      };

      const { error } = projectValidations.put.validate(data);

      expect(error?.message).toBe('"params.id" is required');
    });

    it('should be invalid - body.name is required', async () => {
      const data = {
        params: {
          id: '5f531863-3774-4704-af3b-a2f54ec833a5',
        },
        body: {
          description: 'test',
          url: 'http://test.com',
        },
      };

      const { error } = projectValidations.put.validate(data);

      expect(error?.message).toBe('"body.name" is required');
    });
  });

  describe('projectValidations.remove', () => {
    it('should be valid', async () => {
      const data = {
        params: {
          id: '5f531863-3774-4704-af3b-a2f54ec833a5',
        },
      };

      const { error } = projectValidations.remove.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - params.id is required', async () => {
      const data = {
        params: {},
      };

      const { error } = projectValidations.remove.validate(data);

      expect(error?.message).toBe('"params.id" is required');
    });
  });
});
