import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => {
  return (
    <div className='loadingSpinner'>
        <LoadingOutlined style={{ fontSize: 100, color: 'grey' }} spin /></div>
  )
}

export default LoadingSpinner