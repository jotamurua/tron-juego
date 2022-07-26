import React from 'react'
import Button from '../Button/Button'

const Start = ({onClick}) => {
  return (
    <div className='play'>
        <Button onClick={onClick}>
            Comenzar
        </Button>
    </div>
  )
}

export default Start