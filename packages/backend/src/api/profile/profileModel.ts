import { z } from 'zod';

const profileBody = z.object({
  username: z.string().min(2).max(100),
  bio: z.string().max(10000),
});

export const CreateProfileSchema = z.object({
  body: profileBody,
});

export const UpdateProfileSchema = z.object({
  body: profileBody,
});
