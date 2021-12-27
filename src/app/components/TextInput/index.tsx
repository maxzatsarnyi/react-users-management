import React from 'react';
import { useField } from 'formik';
import './index.scss';

interface Props {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
export const TextInput: React.FC<Props> = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='textinput'>
      <label className='textinput__label' htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className={`textinput__input ${
          meta.touched && meta.error && 'textinput__input_invalid'
        }`}
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <div className='textinput__error'>{meta.error}</div>
      ) : (
        <div style={{ visibility: 'hidden' }}>.</div>
      )}
    </div>
  );
};
