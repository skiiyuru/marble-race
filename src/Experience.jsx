import Lights from "./components/Lights.jsx"
import { Level } from "./components/Level.jsx"
import { Debug, Physics } from "@react-three/rapier"
import Player from "./components/Player.jsx"
import useGame from "./stores/useGame.js"

export default function Experience() {
  const obstacleCount = useGame((state) => state.obstacleCount)
  const obstacleSeed = useGame((state) => state.obstacleSeed)

  return (
    <>
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={obstacleCount} seed={obstacleSeed} />
        <Player />
      </Physics>
    </>
  )
}
