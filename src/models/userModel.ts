import { v4 as uuid } from 'uuid';
import { users } from '../db/users';
import { IUser } from '../types/User';

export const findAllUsers = () =>
  new Promise((res) => {
    res(users);
  });

export const createUser = (user: Omit<IUser, 'id'>) =>
  new Promise((res) => {
    const newUser = { id: uuid(), ...user };

    users.push(newUser);
    res(newUser);
  });
