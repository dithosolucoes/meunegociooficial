import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

interface ThreeSceneProps {
    scrollProgress: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ scrollProgress }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);
    const originalPositionsRef = useRef<Float32Array | null>(null);
    const targetPositionsRef = useRef<Float32Array | null>(null);
    const colorsRef = useRef<Float32Array | null>(null);
    const noise3D = useMemo(() => createNoise3D(), []);
    
    const animationProgressRef = useRef(0);

    // Use a ref to get the latest scrollProgress in the animation loop without re-triggering the effect
    const scrollProgressRef = useRef(scrollProgress);
    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;
        let animationFrameId: number;

        // --- SCENE SETUP (runs once) ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const particlesCnt = 5000;
        const particlesGeometry = new THREE.BufferGeometry();
        const originalPos = new Float32Array(particlesCnt * 3);
        const targetPos = new Float32Array(particlesCnt * 3);
        const colors = new Float32Array(particlesCnt * 3);
        
        const targetGeometry = new THREE.IcosahedronGeometry(2.5, 5);
        const triggerPoint = new THREE.Vector3(0, 0, 2.5);

        const colorChaos = new THREE.Color(0x00ff99);
        const colorCrystal = new THREE.Color(0xffffff);

        for (let i = 0; i < particlesCnt; i++) {
            const i3 = i * 3;
            
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 2.8 + (Math.random() - 0.5) * 1.5;

            originalPos[i3] = radius * Math.sin(phi) * Math.cos(theta);
            originalPos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            originalPos[i3 + 2] = radius * Math.cos(phi);
            
            const targetIndex = i % targetGeometry.attributes.position.count;
            targetPos[i3] = targetGeometry.attributes.position.array[targetIndex * 3];
            targetPos[i3 + 1] = targetGeometry.attributes.position.array[targetIndex * 3 + 1];
            targetPos[i3 + 2] = targetGeometry.attributes.position.array[targetIndex * 3 + 2];

            colorChaos.toArray(colors, i3);
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(originalPos.slice(), 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        originalPositionsRef.current = originalPos;
        targetPositionsRef.current = targetPos;
        colorsRef.current = colors;

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        particlesRef.current = particles;
        scene.add(particles);
        
        const handleResize = () => {
            if (currentMount && cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        const clock = new THREE.Clock();
        
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (!particlesRef.current?.geometry || !rendererRef.current || !sceneRef.current || !cameraRef.current || !originalPositionsRef.current || !targetPositionsRef.current || !colorsRef.current) {
                return;
            }
            
            animationProgressRef.current = THREE.MathUtils.lerp(animationProgressRef.current, scrollProgressRef.current, 0.05);

            const elapsedTime = clock.getElapsedTime();
            
            const currentPositions = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
            const currentColors = particlesRef.current.geometry.attributes.color as THREE.BufferAttribute;
            const original = originalPositionsRef.current;
            const target = targetPositionsRef.current;

            const waveRadius = animationProgressRef.current * 6;
            const waveWidth = 2.5;

            for (let i = 0; i < particlesCnt; i++) {
                const i3 = i * 3;
                
                const noiseFactor = 0.5;
                const timeFactor = elapsedTime * 0.2;
                const noise = noise3D(original[i3] * noiseFactor + timeFactor, original[i3+1] * noiseFactor, original[i3+2] * noiseFactor);

                const breathFactor = Math.sin(elapsedTime * 0.7 + i * 0.5) * 0.03;

                const chaosX = original[i3] * (1 + breathFactor) + noise * 0.8;
                const chaosY = original[i3+1] * (1 + breathFactor) + noise * 0.8;
                const chaosZ = original[i3+2] * (1 + breathFactor) + noise * 0.8;
                
                // Add a check to prevent NaN values from corrupting the buffer
                if (isNaN(chaosX) || isNaN(chaosY) || isNaN(chaosZ)) {
                    continue;
                }

                const particlePos = new THREE.Vector3(chaosX, chaosY, chaosZ);
                const distance = triggerPoint.distanceTo(particlePos);
                
                const localProgress = THREE.MathUtils.smoothstep(distance, waveRadius - waveWidth, waveRadius);

                currentPositions.array[i3] = THREE.MathUtils.lerp(chaosX, target[i3], localProgress);
                currentPositions.array[i3 + 1] = THREE.MathUtils.lerp(chaosY, target[i3 + 1], localProgress);
                currentPositions.array[i3 + 2] = THREE.MathUtils.lerp(chaosZ, target[i3 + 2], localProgress);

                const mixedColor = colorChaos.clone().lerp(colorCrystal, localProgress);
                mixedColor.toArray(currentColors.array, i3);
            }
            currentPositions.needsUpdate = true;
            currentColors.needsUpdate = true;
            
            particlesRef.current.rotation.y = elapsedTime * 0.05 + animationProgressRef.current * 0.5;
            particlesRef.current.rotation.x = elapsedTime * 0.02 + animationProgressRef.current * 0.2;

            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount && rendererRef.current?.domElement) {
                currentMount.removeChild(rendererRef.current.domElement);
            }
            // Dispose of Three.js objects to prevent memory leaks
            particlesRef.current?.geometry.dispose();
            if(particlesRef.current?.material) {
                (particlesRef.current.material as THREE.Material).dispose();
            }
            rendererRef.current?.dispose();
        };
    }, [noise3D]); // The main effect now runs only once.

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ThreeScene;
