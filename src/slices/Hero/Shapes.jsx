// components/Shapes.jsx
"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { gsap } from "gsap";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [1, -0.9, 5],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.3, 0.7, 2, 16), // Pill
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(0.9), // Soccer ball
    },
    {
      position: [-0.8, -0.9, 4],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.3, 0.25, 16, 32), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.0), // Diamond
    },
    {
      position: [0, 0, 0],
      r: 0.5,
      type: "model",
    }
  ];

  const soundEffects = [
    new Audio("/sounds/hit2.ogg"),
    new Audio("/sounds/hit3.ogg"),
    new Audio("/sounds/hit4.ogg"),
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  return (
    <>
      {geometries.map(({ position, r, geometry, type }) =>
        type === "model" ? (
          <STLModel key={JSON.stringify(position)} position={position.map((p) => p * 2)} r={r} soundEffects={soundEffects} />
        ) : (
          <Geometry
            key={JSON.stringify(position)} // Unique key
            position={position.map((p) => p * 2)}
            geometry={geometry}
            soundEffects={soundEffects}
            materials={materials}
            r={r}
          />
        )
      )}
    </>
  );
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}

function STLModel({ position, r, soundEffects }) {
  const groupRef = useRef();
  const [geometry, setGeometry] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(
      "/model2.stl",
      (geometry) => {
        setGeometry(geometry);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the STL file:', error);
      }
    );
  }, []);

  function handleClick() {
    gsap.utils.random(soundEffects).play();

    gsap.to(groupRef.current.rotation, {
      x: `+=${getRandomRotation()}`, // Random rotation around the x-axis
      y: `+=${getRandomRotation()}`, // Random rotation around the y-axis
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    function getRandomRotation() {
      // Generate a random rotation between -2 and 2 radians to prevent extreme rotations
      return gsap.utils.random(-2, 2);
    }
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group
      position={position}
      scale={[0.04 * r, 0.04 * r, 0.04 * r]}
      ref={groupRef}
      rotation={[0, Math.PI / -5, 0]} // Initial askew rotation
    >
      {geometry && (
        <Float speed={1 * r} rotationIntensity={1 * r} floatIntensity={1 * r}>
          <mesh
            geometry={geometry}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            visible={visible}
            material={new THREE.MeshStandardMaterial({ color: 0x4AF400, roughness: 0.1 })}
          />
        </Float>
      )}
    </group>
  );
}
