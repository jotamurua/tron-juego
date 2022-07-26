import React from 'react'

const Button = ({children, onClick}) => {
  return (
    <button className='boton' onClick={onClick}>
        {children}
    </button>
  );
}

export default Button