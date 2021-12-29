import React from 'react';
import { useField } from 'formik';
import './index.scss';

interface Props {
  name: string;
  // type: string;
  label: string;
  placeholder: string;
}
export const TextArea: React.FC<Props> = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='textarea'>
      <label className='textarea__label' htmlFor={props.name}>
        {props.label}
      </label>
      <textarea
        className={`textarea__input ${
          meta.touched && meta.error && 'textarea__input_invalid'
        }`}
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <div className='textarea__error'>{meta.error}</div>
      ) : (
        <div style={{ visibility: 'hidden' }}>.</div>
      )}
    </div>
  );
};
