import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { handleRequest } from './routes/handleRequest';

dotenv.config();

const PORT = process.env.PORT || 4000;

export const server = createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
