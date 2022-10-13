import * as React from "react";
import * as Fiber from "@react-three/fiber";
import * as Drei from "@react-three/drei";
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei'
import {useRef} from "react"
import { useFrame } from "@react-three/fiber";


export default () => {
  const { scene } = Drei.useGLTF("/4aiscreenop.glb");

  

  const Model = ()=>{

    const ref = useRef()
    useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    // ref.current.rotation.y = Math.sin(t / 4) / 8
    // ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    
    ref.current.rotation.y = t/2
    ref.current.rotation.z = 0
    ref.current.rotation.x = 0

    ref.current.position.y = -3
    
    
  })

  return (
<group ref={ref} dispose={null}>
          
          <primitive scale={[1, 1, 1]} object={scene}
          
          
            />
        </group>
  )
  }
  

  return (
    <div className="h-64 w-[600px]">
      <React.Suspense fallback={<div class="flex justify-center items-center mt-24">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    {/* <span class="visually-hidden">Loading...</span> */}
  </div>
</div>}>
      <Fiber.Canvas>

        <Drei.PerspectiveCamera makeDefault zoom={1.2} />
        <Drei.OrbitControls enablePan enableZoom enableRotate />
        {/* <Drei.Sky
          distance={450000}
          sunPosition={[0, 1, 1]}
          inclination={0}
          azimuth={0.25}
        /> */}
        <Drei.Stage>
          <PresentationControls
        global
        config={{ mass: 2, tension: 0 }}
        
        position={[0, 0.25, 0]} 
        scale={0.003}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        {/* <Watch rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} /> */}
        <Model/>
        </PresentationControls>
        {/* <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} /> */}
        {/* <Environment preset="city" /> */}
      
          
        </Drei.Stage>
        
      </Fiber.Canvas>
    </React.Suspense>

    </div>
    
  );
};