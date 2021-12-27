import { User } from '../../entities/index';

export const getUserById = (users: User[], id: number) =>
  users.find((user) => user.id === id);
