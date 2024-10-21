import { IncomingMessage, ServerResponse } from 'node:http';
import { createUser, findAllUsers } from '../models/userModel';
import { parseRequestBody } from '../utils/parseRequestBody';
import { validateBodyData } from '../utils/validateBodyData';

export const getAllUsers = async (res: ServerResponse) => {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const addNewUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { username, age, hobbies } = await parseRequestBody(req);

    const isValidData = validateBodyData({ username, age, hobbies });
    if (!isValidData) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ message: 'Invalid input data' }));
    }

    const user = { username, age, hobbies };
    const newUser = await createUser(user);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};
