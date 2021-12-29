import React, { useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, editUser } from '../../store/actions/users';
import { RootState } from '../../store';
import { User } from '../../../entities';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { TextInput } from '../TextInput/index';
import { useNavigate, useParams } from 'react-router-dom';
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
  const users: User[] = useSelector((state: RootState) => state.users);
  const { userId } = useParams();
  const user: User | undefined = userId
    ? getUserById(users, Number(userId))
    : undefined;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, [userId]);

  return (
    <div className='user-form'>
      <h1 className='user-form__title'>
        {userId ? 'Edit a user' : 'Create a user'}
      </h1>
      <Formik
        initialValues={{
          first_name: user ? user?.first_name : '',
          last_name: user ? user.last_name : '',
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
          birth_date: Yup.string(),
          gender: Yup.string().required('Required'),
          job: Yup.string().max(256, 'Job is too long').required('Required'),
          biography: Yup.string()
            .max(1024, 'Biography is too long')
            .required('Required'),
          is_active: Yup.boolean(),
        })}
        onSubmit={(values) => {
          const newValues: User = {
            ...values,
            id: new Date().getTime(),
            birth_date: getDate(values.birth_date),
          };
          if (user) {
            // edit
            dispatch(editUser(user.id, newValues));
            navigate(`/${ERoutes.info}/${user.id}`);
          } else {
            // create
            dispatch(createUser(newValues));
            navigate(`${ERoutes.home}`);
          }
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
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
                selected={values.birth_date}
                onChange={(date) => setFieldValue('birth_date', date)}
                dateFormat='yyyy/MM/dd'
                className='user-form__datepicker'
                maxDate={new Date()}
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
              Done
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
