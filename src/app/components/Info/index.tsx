import React from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import maleImg from '../../static/images/male.svg';
import femaleImg from '../../static/images/female.svg';
import { deleteUser } from '../../store/actions/users';
import { RootState } from '../../store';
import { User } from '../../../entities';
import { v4 as uuid } from 'uuid';
import { Link, useParams } from 'react-router-dom';
import { getUserById } from '../../utils';
import { ERoutes } from '../../../routes';

export const Info: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => state.users);
  const { userId } = useParams();
  const user = getUserById(users, Number(userId));

  return (
    <div className='info-form'>
      {user ? (
        <>
          <div className='info-form__content'>
            <div
              className='info-form__image'
              onClick={() => dispatch(deleteUser(user.id))}
            >
              <img
                src={user.gender === 'male' ? maleImg : femaleImg}
                alt='user'
              />
            </div>
            <div className='info-form__wrap'>
              <div className='info-form__name'>
                {user.first_name} {user.last_name}
              </div>
              <div className='info-form__data'>{user.birth_date}</div>
              <div className='info-form__data'>{user.job}</div>
              <div className='info-form__data'>
                {user.is_active ? 'Single' : 'Married'}
              </div>
            </div>
          </div>
          <div className='info-form__desc'>{user.biography}</div>
          <div className='info-form__buttons'>
            <Link
              to={`${ERoutes.home}`}
              onClick={() => dispatch(deleteUser(user.id))}
              className='info-form__button'
            >
              Delete
            </Link>
            <Link
              to={`/${ERoutes.user}/${user.id}`}
              className='info-form__button'
            >
              Edit
            </Link>
          </div>
        </>
      ) : (
        <div className='info-form__warning'>User is not found!</div>
      )}
    </div>
  );
};
