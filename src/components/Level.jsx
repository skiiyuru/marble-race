import { Float, Gltf, Text, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useMemo, useRef, useState } from "react"
import {
  BoxGeometry,
  ColorManagement,
  Euler,
  MeshStandardMaterial,
  Quaternion,
} from "three"
import Chest from "./Chest"
import Man from "./Man"
import Lady from "./Lady"

//optimization techniques
ColorManagement.legacyMode = false
const boxGeometry = new BoxGeometry(1, 1, 1)
const floor1Material = new MeshStandardMaterial({
  color: "limegreen",
  metalness: 0,
  roughness: 0,
})
const floor2Material = new MeshStandardMaterial({
  color: "greenyellow",
  metalness: 0,
  roughness: 0,
})
const obstacleMaterial = new MeshStandardMaterial({
  color: "orangered",
  metalness: 0,
  roughness: 1,
})
const wallMaterial = new MeshStandardMaterial({
  color: "slategrey",
  metalness: 0,
  roughness: 0,
})

export function StartPlatform({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} speed={3} rotationIntensity={0.25}>
        <Text
          scale={0.5}
          font="./bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>

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

export function EndPlatform({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Text
        scale={1}
        font="./bebas-neue-v9-latin-regular.woff"
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <Chest />
      </RigidBody>

      <Man />
      <Lady />
    </group>
  )
}

export function SpinnerPlatform({ position = [0, 0, 0] }) {
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

export function LimboPlatform({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  const obstacle = useRef()

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime()

    const y = Math.sin(elapsedTime + timeOffset) + 1.15
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    })
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

export function AxePlatform({ position = [0, 0, 0] }) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  const obstacle = useRef()

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime()

    const x = Math.sin(elapsedTime + timeOffset) * 1.25
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    })
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
        position={[0, 1.65, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        {/* right wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, length * 4]}
          castShadow
        />

        {/* left wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, length * 4]}
          receiveShadow
        />

        {/* end wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 0.75, -(length * 4) + 2]}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />

        {/* Floor */}
        <CuboidCollider
          args={[2, 0.1, length * 2]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  )
}

export function Level({
  count = 5,
  types = [SpinnerPlatform, LimboPlatform, AxePlatform],
  seed = 0,
}) {
  const platforms = useMemo(() => {
    const selections = []

    for (let i = 0; i < count; i++) {
      const randomSelection = types[Math.floor(Math.random() * types.length)]
      selections.push(randomSelection)
    }
    return selections
  }, [count, types, seed])

  return (
    <>
      <StartPlatform position={[0, 0, 0]} />

      {/* obstacle course */}
      {platforms.map((Platform, idx) => (
        <Platform key={"p" + idx} position={[0, 0, (idx + 1) * -4]} />
      ))}

      <EndPlatform position={[0, 0, (count + 1) * -4]} />

      <Bounds length={count + 2} />
    </>
  )
}
