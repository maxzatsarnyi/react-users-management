import React, { ChangeEvent, useState } from 'react';
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
import { getDate, getUserById } from '../../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextArea } from '../TextArea';

const genderOptions: { value: string; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const user = getUserById(users, Number(userId));

  return (
    <div className='user-form'>
      <h1 className='user-form__title'>
        {userId ? 'Edit a user' : 'Create a user'}
      </h1>
      <Formik
        initialValues={{
          first_name: userId ? user?.first_name : '',
          last_name: user ? user.last_name : '',
          // birth_date: user ? user.birth_date : `${getDate(startDate)}`,
          birth_date: user ? new Date(user.birth_date) : new Date(),
          gender: user ? user.gender : genderOptions[0].value,
          job: user ? user.job : '',
          biography: user ? user.biography : '',
          is_active: user ? user.is_active : false,
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(256, 'First Name is too long')
            .required('Required'),
          last_name: Yup.string()
            .max(256, 'Last Name is too long')
            .required('Required'),
          birth_date: Yup.date().required('Required'),
          gender: Yup.string().required('Required'),
          job: Yup.string().max(256, 'Job is too long').required('Required'),
          biography: Yup.string()
            .max(1024, 'Biography is too long')
            .required('Required'),
          is_active: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log(values);
          // id: Number(uuid()),
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className='user-form__form'>
            <TextInput
              name='first_name'
              type='text'
              label='First Name'
              placeholder='John'
            />
            <TextInput
              name='last_name'
              type='text'
              label='Last Name'
              placeholder='Smith'
            />
            <div className='user-form__datepicker-wrap'>
              <div className='user-form__label'>Date of birth</div>
              <DatePicker
                name='birth_date'
                selected={new Date(values.birth_date)}
                // onChange={(date) => setStartDate(date as Date)}
                onChange={(date) => handleChange(date as Date)}
                dateFormat='yyyy/MM/dd'
                className='user-form__datepicker'
              />
            </div>
            <div className='user-form__select-wrap'>
              <div className='user-form__label'>Gender</div>
              <select
                name='gender'
                value={values.gender}
                onChange={handleChange}
              >
                {genderOptions.map((opt, index) => (
                  <option
                    key={index}
                    value={opt.value}
                    data-value={opt.value}
                    data-label={opt.label}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <TextInput
              name='job'
              type='text'
              label='Job'
              placeholder='Designer'
            />
            <TextArea
              name='biography'
              label='Biography'
              placeholder='Was an Austrian composer...'
            />
            <div className='user-form__checkbox'>
              <div className='user-form__label'>Single</div>
              <input
                name='is_active'
                title='Not married'
                type='checkbox'
                checked={values.is_active}
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='user-form__button'>
              {!isSubmitting ? `Done` : 'Loading...'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
