/**
 * SHADER TEMPLATE: Liquid Morph Blob
 *
 * Mouse-reactive metaball blob that morphs organically.
 * The signature "agency landing page" effect.
 *
 * Requires: three, @react-three/fiber, @react-three/drei
 */

import { useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const LiquidBlobMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color('#7928ca'),
    uColor2: new THREE.Color('#0070f3'),
  },
  /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */`
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
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

    float sdCircle(vec2 p, float r) { return length(p) - r; }
    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
      return mix(b, a, h) - k*h*(1.0-h);
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;

      // Three organic blobs
      float d1 = sdCircle(uv - vec2(sin(uTime*0.5)*0.4, cos(uTime*0.7)*0.3), 0.4);
      float d2 = sdCircle(uv - vec2(cos(uTime*0.3)*0.5, sin(uTime*0.6)*0.4), 0.35);
      float d3 = sdCircle(uv - uMouse * 0.8, 0.3);

      // Blend them smoothly
      float d = smin(smin(d1, d2, 0.5), d3, 0.5);
      d += snoise(uv * 4.0 + uTime * 0.5) * 0.08;

      // Color
      vec3 col = mix(uColor1, uColor2, smoothstep(-0.2, 0.2, d));

      // Edge glow
      float glow = 0.008 / abs(d);
      col += glow * vec3(0.5, 0.3, 1.0);

      // Background fade
      float alpha = smoothstep(0.3, -0.1, d);
      col = mix(vec3(0.02), col, alpha + glow * 0.5);

      gl_FragColor = vec4(col, 1.0);
    }
  `
)

extend({ LiquidBlobMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidBlobMaterial: any
    }
  }
}

function BlobPlane() {
  const matRef = useRef<any>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uTime = state.clock.elapsedTime
    // Smooth mouse follow
    mouse.current.lerp(state.pointer, 0.05)
    matRef.current.uMouse = mouse.current
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <liquidBlobMaterial ref={matRef} />
    </mesh>
  )
}

export function LiquidBlobBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <BlobPlane />
      </Canvas>
    </div>
  )
}

// ─── USAGE ───────────────────────────────────────────────────
/*
  import { LiquidBlobBackground } from './liquid-blob'

  export default function HeroSection() {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <LiquidBlobBackground />
        <h1 style={{ position: 'relative', zIndex: 1 }}>Your headline</h1>
      </div>
    )
  }
*/
