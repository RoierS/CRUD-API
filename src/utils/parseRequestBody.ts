import { IncomingMessage } from 'http';
import { IUser } from '../types/User';

export const parseRequestBody = (
  req: IncomingMessage,
): Promise<Omit<IUser, 'id'>> =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
