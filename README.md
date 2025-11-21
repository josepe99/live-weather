# Live Weather (Next.js)

Modern weather search UI inspired by OpenWeather. Users can search any city, share the result via the `?city=` query string, and see live conditions fetched server-side with secure environment variables.

**Live Demo:** https://live-weather-ruddy.vercel.app

## Requirements
- Node.js >= 18.18 (tested with 20.x)
- npm (ships with Node)  
- An OpenWeather API key

## Setup & Run
1. Install dependencies: `npm install`
2. Copy env template and add your key:  
   - PowerShell: `Copy-Item .env.example .env`  
   - Bash: `cp .env.example .env`  
   - Set `OPENWEATHER_API_KEY=<your_key>` in `.env`
3. Start the dev server: `npm run dev` → http://localhost:3000  
   - Example shareable URL: `http://localhost:3000/?city=Bogota`

### Production build
- Lint (optional but recommended): `npm run lint`
- Build: `npm run build`
- Serve production build: `npm start` (requires `OPENWEATHER_API_KEY` in the environment)

## Testing
- Unit/component tests: `npm test`
- Watch mode: `npm run test:watch`
- Coverage report: `npm run test:coverage` (outputs to `coverage/`)

## Configuration
- `OPENWEATHER_API_KEY` (required): Your OpenWeather API key. Needed for server-side fetches in `lib/datasources/weather.datasource.ts`. An error is thrown at startup if it's missing.

## Project layout
- `app/page.tsx` — main page, server-rendered weather view
- `components/` — UI pieces (`CityInput`, `CityList`, `Weather`, `Logo`)
- `lib/actions/weather.actions.ts` — server action entrypoint for fetching weather
- `lib/controllers/weather.controller.ts` — converts inputs to datasource calls and error shapes
- `lib/datasources/weather.datasource.ts` — OpenWeather client with input validation
- `settings.ts` — central place for environment variables
- `public/` — static assets

## Troubleshooting
- Missing key error: ensure `.env` exists with `OPENWEATHER_API_KEY` and restart the server.
- 404/invalid city responses come directly from OpenWeather; double-check spelling.
- If ports are in use, run `npm run dev -- --port 3001` (or another free port).
