import { Router } from 'express';
import { errorResponse, handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers.js';
import { authService } from '@/api/auth/authService.js';
import { ValidateAuthSchema } from '@/api/auth/authModel.js';
import { ServiceResponse } from '@/common/utils/serviceResponse.js';

export const authRouter: Router = (() => {
  const router = Router();

  router.get('/nonce', async function (req, res) {
    const serviceResponse = authService.getNonce();
    req.session.nonce = serviceResponse.data;
    handleServiceResponse(serviceResponse, res);
  });

  router.post('/verify', validateRequest(ValidateAuthSchema), async function (req, res) {
    try {
      if (!req.session.nonce) {
        return errorResponse(400, 'Nonce is missing', res);
      }
      const serviceResponse = await authService.verifyMessage(req.session.nonce!, req.body.message, req.body.signature);

      req.session.siwe = serviceResponse.data;
      if (serviceResponse.data?.expirationTime) {
        req.session.cookie.expires = new Date(serviceResponse.data.expirationTime);
      }

      handleServiceResponse(serviceResponse, res);
    } catch (e) {
      req.session.siwe = null;
      req.session.nonce = null;
      console.error(e);
      errorResponse(500, 'Internal error', res);
    }
  });

  router.get('/me', function (req, res) {
    handleServiceResponse(
      new ServiceResponse({
        data: {
          isLoggedIn: !!req.session.siwe,
          address: req.session.siwe?.address,
        },
      }),
      res,
    );
  });

  router.post('/logout', function (req, res) {
    req.session.siwe = null;
    req.session.nonce = null;
    handleServiceResponse(new ServiceResponse({}), res);
  });

  return router;
})();
