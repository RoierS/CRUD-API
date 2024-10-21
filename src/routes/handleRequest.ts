import { IncomingMessage, ServerResponse } from 'node:http';
import {
  addNewUser,
  getAllUsers,
  getUserById,
} from '../controllers/userController';

export const handleRequest = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const { url, method } = request;
  const urlArray = url?.split('/') || [];
  const id = urlArray[3];

  console.log(urlArray, 'urlArray');
  console.log(id, 'id');

  switch (true) {
    case method === 'GET' &&
      urlArray[1] === 'api' &&
      urlArray[2] === 'users' &&
      urlArray.length === 3:
      getAllUsers(response);
      break;

    case method === 'POST' &&
      urlArray[1] === 'api' &&
      urlArray[2] === 'users' &&
      urlArray.length === 3:
      addNewUser(request, response);
      break;

    case method === 'GET' &&
      urlArray[1] === 'api' &&
      urlArray[2] === 'users' &&
      urlArray.length === 4:
      getUserById(response, id);
      break;

    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'This route not found(' }));
  }

  return { request, response };
};
