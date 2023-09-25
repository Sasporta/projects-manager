import { Request } from 'express';

type PossibleKeys = ['params', 'query', 'body'];

type ReqData = { params?: unknown; query?: unknown; body?: unknown };

const getReqData = (req: Request) => {
  const possibleKeys: PossibleKeys = ['params', 'query', 'body'];

  const reqData: ReqData = {};

  possibleKeys.forEach(key => {
    const data = req[key];

    if (data instanceof Object && Object.keys(data).length > 0) {
      reqData[key] = data;
    }
  });

  return reqData;
};

export default getReqData;
