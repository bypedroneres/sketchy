
import ScratchCard from '../components/ScratchCard'
import './ScratchScreen.css'

function ScratchScreen() {
  return (
    <div className='ScratchScreen'>
      <div className='ScratchScreen_Content'>
        <ScratchCard
          coverImage="/images/aura.png"
          revealImage="/images/position.png"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}

export default ScratchScreen
