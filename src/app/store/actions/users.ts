import { Dispatch } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User } from '../../../entities';

export const USERS_LOAD = 'USERS_LOAD';
export const USERS_INFO = 'USERS_INFO';
export const USERS_DELETE = 'USERS_DELETE';
export const USERS_CREATE = 'USERS_CREATE';
export const USERS_EDIT = 'USERS_EDIT';

const currentUrl = 'https://frontend-candidate.dev.sdh.com.ua/v1/';

export const loadUsersAction = (value: User[]) => ({
  type: USERS_LOAD,
  payload: value,
});

export const getUsersInfoAction = (value: User) => ({
  type: USERS_INFO,
  payload: value,
});

export const createUsersAction = (value: User) => ({
  type: USERS_CREATE,
  payload: value,
});

export const deleteUsersAction = (id: number | undefined) => ({
  type: USERS_DELETE,
  payload: id,
});

export const editUsersAction = (value: any) => ({
  type: USERS_EDIT,
  payload: value,
});

export const loadUsers =
  (controller: AbortController) => async (dispatch: Dispatch) => {
    return axios
      .get(`${currentUrl}/contact/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })
      .then((response) => {
        const { data } = response;
        dispatch(loadUsersAction(data));
      })
      .catch((err) => console.error(err));
  };

export const getUserInfo =
  (id: number, setUser: any, controller: AbortController) =>
  async (dispatch: Dispatch) => {
    return axios
      .get(`${currentUrl}/contact/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })
      .then((response) => {
        const { data } = response;
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

export const createUser = (user: User) => async (dispatch: Dispatch) => {
  return axios
    .post(`${currentUrl}/contact/`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const { data } = response;
      dispatch(createUsersAction(data));
      toast.success('User has been created!');
    })
    .catch((err) => console.error(err));
};

export const deleteUser =
  (id: number | undefined) => async (dispatch: Dispatch) => {
    return axios
      .delete(`${currentUrl}/contact/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        dispatch(deleteUsersAction(id));
        toast.success('User has been deleted!');
      })
      .catch((err) => console.error(err));
  };

export const editUser =
  (id: number, data: User) => async (dispatch: Dispatch) => {
    return axios
      .put(`${currentUrl}/contact/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        dispatch(editUsersAction(data));
        toast.success('User has been edited!');
      })
      .catch((err) => console.error(err));
  };
