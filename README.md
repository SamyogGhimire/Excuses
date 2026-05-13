# Excuse Generator (For Fun)

A small web app that turns a situation into a believable excuse using an AI model.

This website is made for fun and not for anything serious.

## What it does

- You choose a category (relationships, dates, weddings, group trips, family events)
- You describe the situation
- The app generates an excuse, a short version, a believability score, and a risk level
- You can copy the result to your clipboard

## How to run

### Backend (Node/Express)

1. Go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `backend/` with:

   ```bash
   GROQ_API_KEY=your_api_key_here
   ```

4. Start the server:

   ```bash
   npm start
   ```

Server runs on: `http://localhost:5000`

### Frontend (React/Vite)

1. Go to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

Frontend runs on the Vite dev URL (commonly `http://localhost:5173`).

## API

Backend endpoint:

- `POST /generate`

Request body:

- `context`: string (what’s happening)
- `category`: string (category value)

Response:

- `excuse`: string
- `shortVersion`: string
- `believabilityScore`: string or number
- `riskLevel`: string

## Notes

- The frontend calls the backend directly at `http://localhost:5000`.
- If the AI response cannot be parsed as valid JSON, the backend returns an error.

