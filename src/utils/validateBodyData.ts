import { IUser } from '../types/User';

const validateUserName = (username: string) =>
  username && username.trim().length > 0 && typeof username === 'string';

const validateUserAge = (age: number) =>
  age && typeof age === 'number' && age > 0;

const validateUserHobbies = (hobbies: string[]) =>
  Array.isArray(hobbies) &&
  hobbies.every(
    (hobby: string) => typeof hobby === 'string' && hobby.trim().length > 0,
  );

export const validateBodyData = ({
  username,
  age,
  hobbies,
}: Omit<IUser, 'id'>) => {
  const isNameValid = validateUserName(username);
  const isAgeValid = validateUserAge(age);
  const areHobbiesValid = validateUserHobbies(hobbies);
  const isBodyDataValid = isNameValid && isAgeValid && areHobbiesValid;

  return isBodyDataValid;
};
