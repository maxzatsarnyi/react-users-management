import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import deleteImg from '../../static/images/delete.svg';
import { deleteUser } from '../../store/actions/users';
import { RootState } from '../../store';
import { User } from '../../../entities';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../../routes/index';

export const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => state.users);

  useEffect(() => {}, [users]);

  return (
    <ul className='users'>
      {users &&
        users.map((user) => (
          <li className='users__item' key={uuid()}>
            <img
              title='delete'
              className='users__item-delete'
              src={deleteImg}
              alt='delete'
              onClick={() => dispatch(deleteUser(user?.id))}
            />
            <Link
              to={`/${ERoutes.info}/${user?.id}`}
              className='users__item-content'
              onClick={() => console.log('bbb')}
            >
              <div className='users__item-name'>
                {user?.first_name} {user?.last_name}
              </div>
              <div className='users__item-wrap'>
                <div className='users__item-sex'>{user?.gender}</div>
                <div className='users__item-date'>{user?.birth_date}</div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};
