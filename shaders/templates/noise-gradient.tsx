/**
 * SHADER TEMPLATE: Full-Screen Noise Gradient
 *
 * Organic, shifting gradient background using simplex noise.
 * The "how did they make that background alive" effect.
 *
 * Requires: three, @react-three/fiber, @react-three/drei
 */

import { useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const NoiseGradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#7928ca'),
    uColor2: new THREE.Color('#0070f3'),
    uColor3: new THREE.Color('#db2777'),
  },
  // Vertex
  /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  /* glsl */`
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex noise
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
    float snoise(vec2 v){
      const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
      vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
      vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
      vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
      vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
      vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
      m=m*m;m=m*m;
      vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;
      vec3 ox=floor(x+0.5);vec3 a0=x-ox;
      m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
      vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
      return 130.0*dot(m,g);
    }

    void main() {
      float n1 = snoise(vUv * 3.0 + uTime * 0.15);
      float n2 = snoise(vUv * 2.0 - uTime * 0.1);
      vec3 col = mix(uColor1, uColor2, n1 * 0.5 + 0.5);
      col = mix(col, uColor3, n2 * 0.3 + 0.3);
      gl_FragColor = vec4(col, 1.0);
    }
  `
)

extend({ NoiseGradientMaterial })

// Type declaration for JSX (avoids @ts-ignore)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      noiseGradientMaterial: any
    }
  }
}

function GradientPlane() {
  const matRef = useRef<any>(null)
  useFrame((state) => {
    if (matRef.current) matRef.current.uTime = state.clock.elapsedTime
  })
  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <noiseGradientMaterial ref={matRef} />
    </mesh>
  )
}

/**
 * Drop-in noise gradient background.
 * Place behind your UI with position: fixed, z-index: -1
 */
export function NoiseGradientBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <GradientPlane />
      </Canvas>
    </div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────
/*
  import { NoiseGradientBackground } from './noise-gradient'

  export default function Layout({ children }) {
    return (
      <>
        <NoiseGradientBackground />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </>
    )
  }
*/
