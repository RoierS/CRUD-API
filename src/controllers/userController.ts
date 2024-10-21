import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as isUuid } from 'uuid';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from '../models/userModel';
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

export const getUserById = async (res: ServerResponse, id: string) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Not valid UUID' }));
    }

    const user = await findUserById(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }
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

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

export const updateUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Not valid UUID' }));
    }

    const user = await findUserById(id);

    const { username, age, hobbies } = await parseRequestBody(req);

    const updatedUserData = {
      ...user,
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };

    const isValidData = validateBodyData({
      username: updatedUserData.username,
      age: updatedUserData.age,
      hobbies: updatedUserData.hobbies,
    });

    if (!isValidData) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ message: 'Invalid input data' }));
    }
    const newUser = await updateUser(id, updatedUserData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }
    console.log(error);
  }
};

export const deleteUserById = async (res: ServerResponse, id: string) => {
  try {
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Not valid UUID' }));
    }

    await findUserById(id);

    await deleteUser(id);

    res.writeHead(204);
    res.end();

    console.log(`\x1b[42m User with ID ${id} deleted \x1b[0m`);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }
    console.log(error);
  }
};
