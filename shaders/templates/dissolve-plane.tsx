/**
 * SHADER TEMPLATE: Scroll-Driven Dissolve
 *
 * Object dissolves into particles as user scrolls.
 * Uses noise-based alpha cutoff tied to scroll progress.
 *
 * Requires: three, @react-three/fiber, @react-three/drei, gsap (for scroll)
 */

import { useRef } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const DissolveMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uColor: new THREE.Color('#ffffff'),
    uEdgeColor: new THREE.Color('#ff6030'),
  },
  /* glsl */`
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Slight vertex wobble near dissolve edge
      pos.z += sin(pos.x * 8.0 + uTime) * 0.02;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* glsl */`
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform vec3 uEdgeColor;
    varying vec2 vUv;

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
      vec3 x2=2.0*fract(p*C.www)-1.0;vec3 h=abs(x2)-0.5;
      vec3 ox=floor(x2+0.5);vec3 a0=x2-ox;
      m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
      vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
      return 130.0*dot(m,g);
    }

    void main() {
      float noise = snoise(vUv * 8.0 + uTime * 0.05) * 0.5 + 0.5;
      float cutoff = uProgress;

      // Dissolve alpha
      if (noise < cutoff) discard;

      // Burning edge
      float edge = smoothstep(cutoff, cutoff + 0.08, noise);
      vec3 col = mix(uEdgeColor, uColor, edge);

      // Add glow at edge
      float glowEdge = 1.0 - smoothstep(cutoff, cutoff + 0.12, noise);
      col += uEdgeColor * glowEdge * 0.5;

      gl_FragColor = vec4(col, 1.0);
    }
  `
)

extend({ DissolveMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dissolveMaterial: any
    }
  }
}

function DissolvePlane({ progress }: { progress: number }) {
  const matRef = useRef<any>(null)

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uTime = state.clock.elapsedTime
    matRef.current.uProgress = progress
  })

  return (
    <mesh>
      <planeGeometry args={[3, 3, 64, 64]} />
      <dissolveMaterial ref={matRef} side={THREE.DoubleSide} transparent />
    </mesh>
  )
}

/**
 * Scroll-controlled dissolve effect.
 * Pass progress (0 = solid, 1 = fully dissolved).
 *
 * Pair with GSAP ScrollTrigger or Framer Motion useScroll.
 */
export function DissolveScene({ progress = 0 }: { progress: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 2] }} dpr={[1, 1.5]}>
      <DissolvePlane progress={progress} />
    </Canvas>
  )
}

// ─── USAGE ───────────────────────────────────────────────────
/*
  // With Framer Motion useScroll:
  import { useScroll, useTransform } from 'framer-motion'
  import { DissolveScene } from './dissolve-plane'

  function Section() {
    const { scrollYProgress } = useScroll()
    const progress = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
    const [val, setVal] = useState(0)
    useMotionValueEvent(progress, "change", setVal)

    return (
      <div style={{ height: '300vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
          <DissolveScene progress={val} />
        </div>
      </div>
    )
  }
*/
