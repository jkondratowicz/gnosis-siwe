import { generateNonce, SiweMessage } from 'siwe';
import { ResponseStatus, ServiceResponse } from '@/common/utils/serviceResponse.js';
import { StatusCodes } from 'http-status-codes';
import { logger as mainLogger } from '@/common/utils/logger.js';

const logger = mainLogger.child({ module: 'authService' });

export const authService = {
  getNonce: (): ServiceResponse<string> => {
    try {
      const nonce = generateNonce();

      return new ServiceResponse({ data: nonce });
    } catch (ex) {
      const errorMessage = `Error generating nonce: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  verifyMessage: async (nonce: string, message: string, signature: string): Promise<ServiceResponse<SiweMessage>> => {
    try {
      const SIWEObject = new SiweMessage(message);
      const { data } = await SIWEObject.verify({ signature, nonce });

      return new ServiceResponse({ data });
    } catch (ex) {
      const errorMessage = `Error verifying the message: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};
