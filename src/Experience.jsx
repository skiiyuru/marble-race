import { OrbitControls } from "@react-three/drei"
import Lights from "./components/Lights.jsx"
import { Level } from "./components/Level.jsx"
import { Debug, Physics } from "@react-three/rapier"
import Player from "./components/Player.jsx"

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />

      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  )
}
