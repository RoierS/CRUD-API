import { createServer } from 'node:http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer();

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
