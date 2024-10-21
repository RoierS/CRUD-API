import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { handleRequest } from './routes/handleRequest';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => handleRequest(req, res));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
