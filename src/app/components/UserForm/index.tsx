import React from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, deleteUser, editUser } from '../../store/actions/users';
import { RootState } from '../../store';
import { User } from '../../../entities';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { TextInput } from '../TextInput/index';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ERoutes } from '../../../routes';
import { getUserById } from '../../utils';

export const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const { userId } = useParams();

  const isUser = getUserById(users, Number(userId));
  console.log(isUser, ' isUser');
  return (
    <div className='user-form'>
      <div className='user-form__title'>
        {userId ? 'Edit a user' : 'Create a user'}
      </div>
      <Formik
        initialValues={{
          id: Number(uuid()),
          first_name: userId ? userId : '',
          last_name: 'Cuper',
          birth_date: '1999-12-10',
          gender: 'male',
          job: 'MMA',
          biography: 'Was birn to shine',
          is_active: true,
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(256, 'First Name is too long')
            .required('Required'),
          last_name: Yup.string()
            .max(256, 'Last Name is too long')
            .required('Required'),
          birth_date: Yup.date()
            .max(256, 'First Name is too long')
            .required('Required'),
          gender: Yup.string()
            .max(256, 'Last Name is too long')
            .required('Required'),
          job: Yup.string()
            .max(256, 'First Name is too long')
            .required('Required'),
          biography: Yup.string()
            .max(256, 'Last Name is too long')
            .required('Required'),
          is_active: Yup.boolean().required('Required'),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          dispatch(
            userId
              ? dispatch(
                  editUser(Number(userId), {
                    biography: 'Was birn to shine',
                    birth_date: '1999-12-10',
                    first_name: 'New Max',
                    gender: 'male',
                    id: Number(uuid()),
                    is_active: true,
                    job: 'MMA',
                    last_name: 'Cuper',
                  })
                )
              : dispatch(
                  createUser({
                    biography: 'Was birn to shine',
                    birth_date: '1999-12-10',
                    first_name: 'New Max',
                    gender: 'male',
                    id: Number(uuid()),
                    is_active: true,
                    job: 'MMA',
                    last_name: 'Cuper',
                  })
                )
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className='user-form__form'>
            <TextInput
              name='name'
              type='text'
              label='Name'
              placeholder='Johnny'
            />
            <TextInput
              name='email'
              type='text'
              label='Email Address'
              placeholder='johnny@gmail.com'
            />
            <TextInput
              name='password'
              type='password'
              label='Password'
              placeholder='*********'
            />
            <TextInput
              name='repeatPassword'
              type='password'
              label='Repeat Password'
              placeholder='*********'
            />
            <button type='submit' className='user-form__button'>
              {!isSubmitting ? 'Sign Up' : 'Loading...'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
