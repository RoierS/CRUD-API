import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers } from '../controllers/userController';

export const handleRequest = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url, method } = request;
  const urlArray = url?.split('/') || [];

  switch (true) {
    case method === 'GET' &&
      urlArray[1] === 'api' &&
      urlArray[2] === 'users' &&
      urlArray.length === 3:
      getAllUsers(response);
      break;

    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'This route not found(' }));
  }

  return { request, response };
};
