import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Profiles {
  bio: string;
  createdAt: Generated<Timestamp>;
  externalId: string;
  id: Generated<string>;
  updatedAt: Generated<Timestamp>;
  username: string;
}

export interface SchemaMigrations {
  version: string;
}

export interface DB {
  profiles: Profiles;
  schemaMigrations: SchemaMigrations;
}
