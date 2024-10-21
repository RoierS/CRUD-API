import { ServerResponse } from 'node:http';
import { findAllUsers } from '../models/userModel';

export const getAllUsers = async (res: ServerResponse) => {
  try {
    const users = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};
