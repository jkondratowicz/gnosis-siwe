import { z } from 'zod';

export const ValidateAuthSchema = z.object({
  body: z.object({
    message: z.string(),
    signature: z.string(),
  }),
});
