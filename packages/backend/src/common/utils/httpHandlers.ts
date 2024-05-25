import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodSchema } from 'zod';
import { ResponseStatus, ServiceResponse } from '@/common/utils/serviceResponse.js';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const errorResponse = (code: number, message: string, response: Response) => {
  return response.status(code).send(new ServiceResponse({ status: ResponseStatus.Failed, message, statusCode: code }));
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(', ')}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).send(
      new ServiceResponse({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: err,
        statusCode,
      }),
    );
  }
};
