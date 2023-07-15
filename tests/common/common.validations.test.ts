import * as validations from '@common/common.validations';

describe('common.validations', () => {
  describe('validations.uuid', () => {
    it('should be valid', async () => {
      const data = '5f531863-3774-4704-af3b-a2f54ec833a5';

      const { error } = validations.uuid.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - must be a string', async () => {
      const data = 1;

      const { error } = validations.uuid.validate(data);

      expect(error?.message).toBe('"value" must be a string');
    });

    it('should be invalid - must be a valid GUID', async () => {
      const data = '5f531863-3774-4704-af3b-a2f54ec833a';

      const { error } = validations.uuid.validate(data);

      expect(error?.message).toBe('"value" must be a valid GUID');
    });

    it('should be invalid - is required', async () => {
      const data = undefined;

      const { error } = validations.uuid.validate(data);

      expect(error?.message).toBe('"value" is required');
    });
  });

  describe('validations.url', () => {
    it('should be valid', async () => {
      const data = 'http://test.com';

      const { error } = validations.url.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - must be a string', async () => {
      const data = 1;

      const { error } = validations.url.validate(data);

      expect(error?.message).toBe('"value" must be a string');
    });

    it('should be invalid - must be a valid uri', async () => {
      const data = 'http//test';

      const { error } = validations.url.validate(data);

      expect(error?.message).toBe('"value" must be a valid uri');
    });

    it('should be invalid - not allowed to be empty', async () => {
      const data = '';

      const { error } = validations.url.validate(data);

      expect(error?.message).toBe('"value" is not allowed to be empty');
    });

    it('should be invalid - less than or equal to 50 characters', async () => {
      const data = 'http://longer-then-fifty-characters-domain-name.com';

      const { error } = validations.url.validate(data);

      expect(error?.message).toBe(
        '"value" length must be less than or equal to 50 characters long',
      );
    });

    it('should be invalid - is required', async () => {
      const data = undefined;

      const { error } = validations.url.validate(data);

      expect(error?.message).toBe('"value" is required');
    });
  });

  describe('validations.name', () => {
    it('should be valid', async () => {
      const data = 'josh';

      const { error } = validations.name.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - must be a string', async () => {
      const data = 1;

      const { error } = validations.name.validate(data);

      expect(error?.message).toBe('"value" must be a string');
    });

    it('should be invalid - must only contain alpha-numeric characters', async () => {
      const data = 'test test';

      const { error } = validations.name.validate(data);

      expect(error?.message).toBe(
        '"value" must only contain alpha-numeric characters',
      );
    });

    it('should be invalid - not allowed to be empty', async () => {
      const data = '';

      const { error } = validations.name.validate(data);

      expect(error?.message).toBe('"value" is not allowed to be empty');
    });

    it('should be invalid - less than or equal to 30 characters', async () => {
      const data = 'ALongerThenThirtyCharactersName';

      const { error } = validations.name.validate(data);

      expect(error?.message).toBe(
        '"value" length must be less than or equal to 30 characters long',
      );
    });

    it('should be invalid - is required', async () => {
      const data = undefined;

      const { error } = validations.name.validate(data);

      expect(error?.message).toBe('"value" is required');
    });
  });

  describe('validations.description', () => {
    it('should be valid', async () => {
      const data = 'This is a valid description.';

      const { error } = validations.description.validate(data);

      expect(error).toBeUndefined();
    });

    it('should be invalid - must be a string', async () => {
      const data = 1;

      const { error } = validations.description.validate(data);

      expect(error?.message).toBe('"value" must be a string');
    });

    it('should be invalid - fails to match the required pattern', async () => {
      const data = 'a description with special characters: !@#$%^&*()';

      const { error } = validations.description.validate(data);

      expect(error?.message).toBe(
        '"value" with value "a description with special characters: !@#$%^&*()" fails to match the required pattern: /^[a-zA-Z,. ]*$/',
      );
    });

    it('should be invalid - not allowed to be empty', async () => {
      const data = '';

      const { error } = validations.description.validate(data);

      expect(error?.message).toBe('"value" is not allowed to be empty');
    });

    it('should be invalid - less than or equal to 30 characters', async () => {
      const data =
        'in order to test the length limit validation, this is a longer then one hundred characters description.';

      const { error } = validations.description.validate(data);

      expect(error?.message).toBe(
        '"value" length must be less than or equal to 100 characters long',
      );
    });

    it('should be invalid - is required', async () => {
      const data = undefined;

      const { error } = validations.description.validate(data);

      expect(error?.message).toBe('"value" is required');
    });
  });
});
