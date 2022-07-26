import React from 'react'
import Button from '../Button/Button'

const Result = ({result, onClick}) => {
  return (
    <div>
        <h1>
            {result}
        </h1>
        <Button onClick={onClick}>
            {result}
        </Button>
    </div>
  )
}

export default Result