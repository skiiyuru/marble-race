import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import {
  BoxGeometry,
  ColorManagement,
  Euler,
  MeshStandardMaterial,
  Quaternion,
} from "three"

//optimization techniques
ColorManagement.legacyMode = false

const boxGeometry = new BoxGeometry(1, 1, 1)
const floor1Material = new MeshStandardMaterial({ color: "limegreen" })
const floor2Material = new MeshStandardMaterial({ color: "greenyellow" })
const obstacleMaterial = new MeshStandardMaterial({ color: "orangered" })
const wallMaterial = new MeshStandardMaterial({ color: "slategrey" })

function StartBlock({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  )
}

function SpinnerBlock({ position = [0, 0, 0] }) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  )

  const obstacle = useRef()

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime()

    const eulerAngle = new Euler(0, elapsedTime * speed, 0)
    const quarternionAngle = new Quaternion()
    quarternionAngle.setFromEuler(eulerAngle)
    obstacle.current.setNextKinematicRotation(quarternionAngle)
  })

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      {/* spinner obstacle */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.3, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export default function Level() {
  return (
    <>
      <StartBlock position={[0, 0, 4]} />
      <SpinnerBlock position={[0, 0, 0]} />
    </>
  )
}
