import React from 'react';
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
  return (
    <ul className='users'>
      {users &&
        users.map(({ first_name, last_name, gender, birth_date, id }) => (
          <li className='users__item' key={uuid()}>
            <img
              title='delete'
              className='users__item-delete'
              src={deleteImg}
              alt='delete'
              onClick={() => dispatch(deleteUser(id))}
            />
            <Link
              to={`/${ERoutes.info}/${id}`}
              className='users__item-content'
              onClick={() => console.log('bbb')}
            >
              <div className='users__item-name'>
                {first_name} {last_name}
              </div>
              <div className='users__item-wrap'>
                <div className='users__item-sex'>{gender}</div>
                <div className='users__item-date'>{birth_date}</div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};
