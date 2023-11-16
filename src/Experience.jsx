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
  const phase = useGame((state) => state.phase)

  // create the sound only once
  const [backgroundMusic] = useState(() => new Audio("./main.mp3"))
  const [finishSound] = useState(() => new Audio("./finish.mp3"))

  useEffect(() => {
    if (phase === "playing") {
      backgroundMusic.currentTime = 0
      backgroundMusic.play()
    } else if (phase === "ready") {
      backgroundMusic.pause()
      finishSound.pause()
    } else if (phase === "ended") {
      backgroundMusic.volume = 0.3
      finishSound.currentTime = 0
      finishSound.play()
    }
  }, [phase])

  // const { obstacleCount } = useControls("Difficulty", {
  //   obstacleCount: {
  //     value: 10,
  //     min: 10,
  //     max: 30,
  //     step: 1,
  //   },
  // })

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
