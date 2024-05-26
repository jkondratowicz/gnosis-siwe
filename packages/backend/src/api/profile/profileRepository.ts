import { db } from '@/db/db.js';
import { Profile } from '@/db/types.gen.js';
import { Selectable } from 'kysely';

export const profileRepository = {
  getProfile: (address: string): Promise<Selectable<Profile> | undefined> => {
    return db.selectFrom('profile').selectAll().where('externalId', '=', address).executeTakeFirst();
  },

  createProfile: ({ address, username, bio }: { address: string; username: string; bio: string }) => {
    return db.insertInto('profile').values({ externalId: address, username, bio }).execute();
  },

  updateProfile: (address: string, { username, bio }: { username: string; bio: string }) => {
    return db.updateTable('profile').set({ username, bio }).where('externalId', '=', address).executeTakeFirstOrThrow();
  },
};
