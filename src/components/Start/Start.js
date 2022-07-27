import Button from '../Button/Button'

const Start = ({twoPlayers, threePlayers, fourPlayers}) => {
  return (
    <div className='play'>
        <Button onClick={() =>{twoPlayers()}}>
            2 Jugadores
        </Button>
        <Button onClick={() => {threePlayers()}}>
            3 Jugadores
        </Button>
        <Button onClick={() => {fourPlayers()}}>
            4 Jugadores
        </Button>
    </div>
  )
}

export default Start