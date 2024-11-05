# Synonyms Tool

This Synonyms Tool allows users to add words with their synonyms and search for synonyms in both directions. The application is built with a ReactJS frontend and an Express backend, focusing on performance and scalability.

## Features
- Add words with multiple synonyms
- Search for synonyms of a word
- Bidirectional synonym lookup
- Scalable architecture with frontend (React) and backend (Node.js/Express)
- Rate limiting to prevent abuse of the API

## Project Structure
- `client/`: React frontend
  - `src/api`: Contains the API service configuration for the frontend.
  - `src/components`: Reusable components like Navbar and Footer.
  - `src/pages`: Pages for adding and searching synonyms.
  - `src/constants`: Holds constants like routes.

- `server/`: Node.js backend
  - `controllers/`: Logic for adding and searching synonyms.
  - `routes/`: API routes.
  - `services/`: Business logic handling synonyms data.
  - `utils/`: Utility functions (e.g., rate limiting).

## Technologies Used
- React
- Node.js
- Express.js
- Axios (HTTP requests)
- Jest (for testing)
- express-rate-limit (for rate limiting)

## Installation and Setup

### Backend Setup
1. Navigate to `server/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file and set up environment variables (e.g., `PORT`).
4. Start the server: `npm start`.

### Frontend Setup
1. Navigate to `client/synonyms-tool-client/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file and set up environment variables (e.g., `REACT_APP_API_URL`).
3. Start the React client: `npm start`.


## Testing
To run unit tests for the backend:
1. Navigate to the `server/` directory.
2. Run: `npm test`

## License
This project is licensed under the MIT License.
