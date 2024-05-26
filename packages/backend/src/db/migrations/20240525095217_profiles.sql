-- migrate:up
CREATE TABLE profile(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id VARCHAR(255) NOT NULL,
  username TEXT NOT NULL,
  bio TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX profile_external_id_unique ON profile (external_id);

CREATE OR REPLACE FUNCTION profile_update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER profile_update_modified_time BEFORE UPDATE ON profile FOR EACH ROW EXECUTE PROCEDURE profile_update_modified_column();

-- migrate:down
DROP TABLE profile;
