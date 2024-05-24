import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/utils/serviceResponse.js';
import { handleServiceResponse } from '@/common/utils/httpHandlers.js';

export const healthCheckRouter: Router = (() => {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
