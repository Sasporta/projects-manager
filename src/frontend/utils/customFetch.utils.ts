import * as log from '../lib/log.lib';

const allowedStatuses = new Set([200, 201, 204]);

export const customFetch = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);

    if (!allowedStatuses.has(res.status)) {
      const message = res.status === 500 ? await res.json() : res.statusText;

      throw new Error(message);
    }

    if (res.status === 204) {
      return { isError: false };
    }

    const { data, error } = await res.json();

    if (error) {
      throw new Error(error);
    }

    return { data, isError: false };
  } catch (error) {
    log.error(`Error during custom fetch, exception: ${error}`);

    return { isError: true };
  }
};
