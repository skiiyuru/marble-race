import Lights from "./components/Lights.jsx"
import { Level } from "./components/Level.jsx"
import { Debug, Physics } from "@react-three/rapier"
import Player from "./components/Player.jsx"
import useGame from "./stores/useGame.js"
import Effects from "./components/Effects.jsx"
import { useControls } from "leva"
import { useEffect, useState } from "react"

export default function Experience() {
  const obstacleCount = useGame((state) => state.obstacleCount)
  const obstacleSeed = useGame((state) => state.obstacleSeed)
  const restart = useGame((state) => state.restart)

  return (
    <>
      <color args={["#bdedfc"]} attach={"background"} />
      <Lights />
      {/* <Effects /> */}
      <Physics>
        {/* <Debug /> */}
        <Level count={obstacleCount} seed={obstacleSeed} />
        <Player />
      </Physics>
    </>
  )
}
