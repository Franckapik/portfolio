import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, useGLTF, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { EffectComposer, Bloom} from '@react-three/postprocessing'

function Model({ url, setActive, active }) {
  const { nodes, materials } = useGLTF(url)
  
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7}>
        <mesh receiveShadow castShadow geometry={nodes.all.geometry} material={nodes.all.material} />
        <mesh onPointerOver={() => setActive("Regarder")} receiveShadow castShadow geometry={nodes.regarder.geometry} material={nodes.regarder.material} />
        <mesh onPointerOver={() => setActive("Bidouiller")} receiveShadow castShadow geometry={nodes.bidouiller.geometry} material={nodes.bidouiller.material} />
        <mesh onPointerOver={() => setActive("Programmer")} receiveShadow castShadow geometry={nodes.programmer.geometry} material={nodes.programmer.material} />
        <mesh onPointerOver={() => setActive("Jouer")} receiveShadow castShadow geometry={nodes.jouer.geometry} material={nodes.jouer.material} />
        <mesh onPointerOver={() => setActive("Ecouter")} receiveShadow castShadow geometry={nodes.ecouter.geometry} material={nodes.ecouter.material} />
      </group>
  )
}

export default function App() {
  const [active, setActive] = useState("COucou")


  return (
    <>
      <div className="bg" />
      <h1>
        Fanch 
        <br />
        Cavellec
        <br />
        <span style={{fontSize : '0.4em', color : 'peru'}} >Portfolio</span> 
        <br />
        {active}
      </h1>
      <Canvas dpr={[1.5, 2]} linear shadows>
        <fog attach="fog" args={['#272730', 16, 30]} />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={75}>
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight castShadow intensity={1} angle={0.2} penumbra={1} position={[-25, 20, -15]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
      </PerspectiveCamera>
        <Suspense fallback={null}>
          <Model setActive={setActive} active={active} url="/scene2.glb" />
          <EffectComposer autoClear={false}>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
        </Suspense>
        <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Stars radius={500} depth={50} count={1000} factor={10} />
      </Canvas>
      <div className="layer" />
      <Loader />
      <a href="https://github.com/Franckapik" className="top-left" children="Github" />
    </>
  )
}
