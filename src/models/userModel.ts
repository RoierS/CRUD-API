import { users } from '../db/users';

export const findAllUsers = () => {
  return new Promise((res) => {
    res(users);
  });
};
