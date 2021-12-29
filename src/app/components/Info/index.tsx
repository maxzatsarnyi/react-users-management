import React, { useEffect, useState } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import maleImg from '../../static/images/male.svg';
import femaleImg from '../../static/images/female.svg';
import { deleteUser, getUserInfo } from '../../store/actions/users';
import { RootState } from '../../store';
import { User } from '../../../entities';
import { Link, useParams } from 'react-router-dom';
import { ERoutes } from '../../../routes';
import { ToastContainer } from 'react-toastify';

export const Info: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    if (userId) {
      const id = Number(userId);
      dispatch(getUserInfo(id, setUser, controller));
    }
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className='info-form'>
        {user ? (
          <>
            <div className='info-form__content'>
              <div
                className='info-form__image'
                onClick={() => dispatch(deleteUser(user?.id))}
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
                onClick={() => dispatch(deleteUser(user?.id))}
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
      <div>
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
    </>
  );
};
