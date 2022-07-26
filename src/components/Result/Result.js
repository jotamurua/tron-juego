import React from 'react'
import Button from '../Button/Button'

const Result = ({result, onClick}) => {
  return (
    <div className='play'>
        <h1>
            {result}
        </h1>
        <Button onClick={onClick}>
            Volver a jugar
        </Button>
    </div>
  )
}

export default Result