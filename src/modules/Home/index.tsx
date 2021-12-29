import { useEffect, useState } from 'react';
import './index.scss';
import {
  createUser,
  deleteUser,
  editUser,
  getUserInfo,
  loadUsers,
} from '../../app/store/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/index';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../../entities';
import { Users } from '../../app/components/Users';
import { ERoutes } from '../../routes';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const users: any[] = useSelector((state: RootState) => state.users);

  const obj: User = {
    biography: 'Was birn to shine',
    birth_date: '1999-12-10',
    first_name: 'New Max',
    gender: 'male',
    id: Number(uuid()),
    is_active: true,
    job: 'MMA',
    last_name: 'Cuper',
  };
  useEffect(() => {
    const controller = new AbortController();
    dispatch(loadUsers(controller));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        <h1>Users page</h1>
        <Users />
        <Link to={`/${ERoutes.user}`} className='home__button'>
          Add
        </Link>
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default HomePage;
