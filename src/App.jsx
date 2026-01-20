import { useState } from 'react'
import Blueprints from './Blueprints'
import Contracts from './Contracts'

function App() {
  const [blueprints, setBlueprints] = useState([])

  return (
    <div>
      <h1>Contract Management Platform</h1>

      <Blueprints
        blueprints={blueprints}
        setBlueprints={setBlueprints}
      />

      <hr />

      <Contracts blueprints={blueprints} />
    </div>
  )
}

export default App
