import { User } from '../../entities/index';

export const getUserById = (users: User[], id: number) =>
  users.find((user) => user.id === id);

// return date in format year-month-day from number value
export function getDate(date: Date): string {
  // const date = new Date(value);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}-${month + 1}-${day}`;
}
