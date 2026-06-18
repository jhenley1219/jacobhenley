// Email is stored base64-encoded and assembled in the browser so the plaintext
// address never appears in the static HTML (light scraper protection).
const ENCODED_EMAIL = 'amJoZW5sZXkxMjE5QGdtYWlsLmNvbQ==';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jacob-henley2/';

export const GITHUB_URL = 'https://github.com/jhenley1219';

export const getEmail = (): string => atob(ENCODED_EMAIL);
