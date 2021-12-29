import { User } from '../../../entities';
import { IPayload } from '../../../interfaces/redux';
import {
  USERS_LOAD,
  USERS_INFO,
  USERS_CREATE,
  USERS_DELETE,
  USERS_EDIT,
} from '../actions/users';

const initialState: User[] = [];

export const usersReducer = (state: User[], action: IPayload<any>): User[] => {
  switch (action.type) {
    case USERS_LOAD:
      return action.payload;

    case USERS_INFO:
      return action.payload;

    case USERS_CREATE:
      return [...state, action.payload];

    case USERS_DELETE:
      return state.filter((comment) => comment.id !== action.payload);

    case USERS_EDIT:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });

    default: {
      return [...initialState];
    }
  }
};
