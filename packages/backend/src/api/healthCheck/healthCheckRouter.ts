import { Request, Response, Router } from 'express';

import { ServiceResponse } from '@/common/utils/serviceResponse.js';
import { handleServiceResponse } from '@/common/utils/httpHandlers.js';

export const healthCheckRouter: Router = (() => {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse({ message: 'Service is healthy' });
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
