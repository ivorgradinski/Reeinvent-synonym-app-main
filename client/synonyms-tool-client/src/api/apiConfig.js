//so you can easily deploy the app or run it locally with just one environment variable change
export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
export const SYNONYM_API = `${BASE_URL}/api/synonyms`;
