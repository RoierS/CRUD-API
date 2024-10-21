import { v4 as uuid } from 'uuid';
import { users } from '../db/users';
import { IUser } from '../types/User';

export const findAllUsers = () =>
  new Promise((res) => {
    res(users);
  });

export const findUserById = (id: string): Promise<IUser> =>
  new Promise((res, rej) => {
    const user = users.find((u) => u.id === id);

    if (!user) {
      rej(new Error('User not found'));
    } else {
      res(user);
    }
  });

export const createUser = (user: Omit<IUser, 'id'>) =>
  new Promise((res) => {
    const newUser = { id: uuid(), ...user };

    users.push(newUser);
    res(newUser);
  });

export const updateUser = (id: string, user: Omit<IUser, 'id'>) =>
  new Promise((res, rej) => {
    const index = users.findIndex((u) => u.id === id);

    users[index] = { id, ...user };

    if (index === -1) {
      rej(new Error('User not found'));
    }
    res(users[index]);
  });

export const deleteUser = (id: string): Promise<void> =>
  new Promise((res) => {
    users.filter((u) => u.id !== id);
    res();
  });
