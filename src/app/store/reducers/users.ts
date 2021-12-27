import { IPayload } from '../../../interfaces/redux';
import {
  USERS_LOAD,
  USERS_INFO,
  USERS_CREATE,
  USERS_DELETE,
  USERS_EDIT,
} from '../actions/users';

const initialState: any[] = [];

export const usersReducer = (state: any[], action: IPayload<any>) => {
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
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });

    default: {
      return [...initialState];
    }
  }
};
