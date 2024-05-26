# gnosis-siwe-jk

The app uses a basic monorepo setup with two packages (front and backend), Postgres as data persistence.

### Backend

- basic express setup with local session storage
- SIWE for authentication
- dotenv + envalid for configuration
- kysely for database queries
- dbmate for migrations
- pino for logging
- zod for validation

Code is organized by feature and uses repository pattern to separate data access from logic.

### Frontend

Very basic React app bootstrapped using Vite, with Tailwind configured for easier prototyping. Most interactions go
through the web3 context.

## Running the app locally

### Pre-requisites

- Node.js v20
- yarn 4
- npx
- Docker (for local development) or Postgres

### Setup

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Create a `.env` file in the backend package, e.g. `cp packages/backend/.env.example packages/backend/.env`
4. Run setup script `yarn setup`

### Run

Run `yarn dev` to start the development servers (both frontend and backend)

## Production

This is not well tested, obviously.

Build:  
`docker build -t gnosis-siwe-jk .`

Run:  
`docker run --rm -e PORT=8090 -e DATABASE_URL="postgres://user:password@localhost:5439/dev?sslmode=disable" -e SESSION_SECRET="c7dd97f3-5031-4e35-be3e-1539ea18a565" -p 8090:8090 gnosis-siwe-jk`
