import { Router } from 'express';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers.js';
import { onlyAuthenticated } from '@/common/middleware/auth.js';
import { profileService } from '@/api/profile/profileService.js';
import { CreateProfileSchema, UpdateProfileSchema } from '@/api/profile/profileModel.js';

export const profileRouter: Router = (() => {
  const router = Router();

  router.get('/', onlyAuthenticated, async function (req, res) {
    const serviceResponse = await profileService.getProfile(req.session.siwe!.address);
    handleServiceResponse(serviceResponse, res);
  });

  router.post('/', onlyAuthenticated, validateRequest(CreateProfileSchema), async function (req, res) {
    const serviceResponse = await profileService.createProfile({
      address: req.session.siwe!.address,
      username: req.body.username,
      bio: req.body.bio,
    });
    handleServiceResponse(serviceResponse, res);
  });

  router.patch('/', onlyAuthenticated, validateRequest(UpdateProfileSchema), async function (req, res) {
    const serviceResponse = await profileService.updateProfile({
      address: req.session.siwe!.address,
      username: req.body.username,
      bio: req.body.bio,
    });
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
