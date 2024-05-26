import { Router } from 'express';
import { handleServiceResponse } from '@/common/utils/httpHandlers.js';
import { onlyAuthenticated } from '@/common/middleware/auth.js';
import { profileService } from '@/api/profile/profileService.js';

export const profileRouter: Router = (() => {
  const router = Router();

  router.get('/', onlyAuthenticated, async function (req, res) {
    const serviceResponse = await profileService.getProfile(req.session.siwe!.address);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
