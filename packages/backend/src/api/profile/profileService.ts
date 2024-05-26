import { ResponseStatus, ServiceResponse } from '@/common/utils/serviceResponse.js';
import { StatusCodes } from 'http-status-codes';
import { logger as mainLogger } from '@/common/utils/logger.js';
import { profileRepository } from '@/api/profile/profileRepository.js';
import { Profile } from '@/db/types.gen.js';
import { Selectable } from 'kysely';

const logger = mainLogger.child({ module: 'profileService' });

export const profileService = {
  getProfile: async (address: string): Promise<ServiceResponse<Selectable<Profile>>> => {
    try {
      return new ServiceResponse({ data: await profileRepository.getProfile(address) });
    } catch (ex) {
      const errorMessage = `Error getting the profile: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  createProfile: async ({
    address,
    username,
    bio,
  }: {
    address: string;
    username: string;
    bio: string;
  }): Promise<ServiceResponse<number>> => {
    try {
      const response = await profileRepository.createProfile({ address, username, bio });
      return new ServiceResponse({ data: response.length });
    } catch (ex) {
      const errorMessage = `Error creating the profile: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  updateProfile: async ({
    address,
    username,
    bio,
  }: {
    address: string;
    username: string;
    bio: string;
  }): Promise<ServiceResponse<bigint>> => {
    try {
      const response = await profileRepository.updateProfile(address, { username, bio });
      return new ServiceResponse({ data: response.numUpdatedRows.valueOf() });
    } catch (ex) {
      const errorMessage = `Error updating the profile: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
