import React, { useState } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';

interface Props {}

export const Comment: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();

  return <li className='comment'></li>;
};
