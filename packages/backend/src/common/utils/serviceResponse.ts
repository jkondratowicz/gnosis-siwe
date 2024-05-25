import { z } from 'zod';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;

  constructor({
    data = undefined,
    status = ResponseStatus.Success,
    message = getReasonPhrase(StatusCodes.OK),
    statusCode = StatusCodes.OK,
  }: {
    data?: T;
    status?: ResponseStatus;
    message?: string;
    statusCode?: number;
  }) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
    statusCode: z.number(),
  });
