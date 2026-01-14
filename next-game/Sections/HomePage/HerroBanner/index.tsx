'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';

export default function HeroBanner() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;

        // Konteyner ölçüləri (800px hündürlük üçün)
        let width = container.clientWidth;
        let height = container.clientHeight;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.set(0, 10, 45);

        // Scene
        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0x111122, 3));

        // Texture generator
        function generateTexture() {
            const canvasTex = document.createElement('canvas');
            canvasTex.width = 2;
            canvasTex.height = 2;
            const context = canvasTex.getContext('2d');
            if (context) {
                context.fillStyle = 'white';
                context.fillRect(0, 1, 2, 1);
            }
            return canvasTex;
        }

        // Create light function
        function createLight(color: number) {
            const intensity = 200;
            const light = new THREE.PointLight(color, intensity, 30);
            light.castShadow = true;
            
            let geometry = new THREE.SphereGeometry(0.3, 12, 6);
            let material = new THREE.MeshBasicMaterial({ color: color });
            material.color.multiplyScalar(intensity);
            let sphere = new THREE.Mesh(geometry, material);
            light.add(sphere);

            const texture = new THREE.CanvasTexture(generateTexture());
            texture.magFilter = THREE.NearestFilter;
            texture.wrapT = THREE.RepeatWrapping;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.set(1, 4.5);

            geometry = new THREE.SphereGeometry(2, 32, 8);
            const pMaterial = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                alphaMap: texture,
                alphaTest: 0.5,
            });

            const outerSphere = new THREE.Mesh(geometry, pMaterial);
            outerSphere.castShadow = true;
            outerSphere.receiveShadow = true;
            light.add(outerSphere);

            return light;
        }

        // 7 Rəngarəng işıq
        const lights = [
            createLight(0x0088ff), createLight(0xff8888),
            createLight(0x00ff88), createLight(0xff00ff),
            createLight(0xffff00), createLight(0x00ffff),
            createLight(0xff6600)
        ];
        lights.forEach(l => scene.add(l));

        // Box mesh - arxa divarlar
        const boxGeo = new THREE.BoxGeometry(120, 120, 120);
        const boxMat = new THREE.MeshPhongMaterial({
            color: 0xa0adaf,
            shininess: 15,
            specular: 0x111111,
            side: THREE.BackSide,
        });
        const mesh = new THREE.Mesh(boxGeo, boxMat);
        mesh.position.y = 10;
        mesh.receiveShadow = true;
        scene.add(mesh);

        // Particles (Ulduz effekti)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 120;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.12,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;

        // Resize handler
        function onWindowResize() {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }

        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        let animationFrameId: number;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            let time = performance.now() * 0.0008;

            lights.forEach((light, i) => {
                const t = time + (i * 10);
                light.position.x = Math.sin(t * (0.5 + i * 0.04)) * 22;
                light.position.y = Math.cos(t * (0.4 + i * 0.04)) * 20 + 10;
                light.position.z = Math.sin(t * (0.6 + i * 0.04)) * 22;
                light.rotation.x = t * 2;
            });

            particlesMesh.rotation.y += 0.0003;
            renderer.render(scene, camera);
        }

        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[900px] overflow-hidden bg-[#0a0a14]">
            {/* Three.js Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full block z-0"
                style={{ pointerEvents: 'none' }}
            />

            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-12 lg:px-24 xl:pl-32">
                <div className="max-w-4xl text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 bg-[rgba(0,136,255,0.1)] border border-[rgba(0,136,255,0.3)] rounded-full backdrop-blur-md">
                        <TrendingUp className="w-4 h-4 text-[#0088ff]" />
                        <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">New Games Arrived</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-orbitron)] leading-none mb-8">
                        <span className="block text-white">Welcome to the</span>
                        <span className="block bg-gradient-to-r from-[#0088ff] via-[#00ccff] to-[#ff8888] bg-clip-text text-transparent">Gaming World</span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light">
                        The latest games, consoles and accessories are now at GameStore. 
                        Experience premium gaming at the best prices.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-start items-center mb-16">
                        <button className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#0088ff] to-[#0066cc] hover:from-[#0066cc] hover:to-[#0088ff] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,136,255,0.3)] hover:scale-105 active:scale-95">
                            <Play className="w-6 h-6 fill-current" />
                            Start Shopping Now
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>

                        <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-[#ff8888] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:scale-105 active:scale-95">
                            View Deals
                            <span className="ml-2 px-2 py-0.5 bg-[#ff8888] text-white text-xs rounded-md animate-pulse">
                                -50%
                            </span>
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-12 border-t border-white/10 pt-12">
                        <div>
                            <div className="text-4xl lg:text-5xl font-black text-white">500+</div>
                            <div className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-[0.2em] font-semibold">Premium Games</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-black text-white">50K+</div>
                            <div className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-[0.2em] font-semibold">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-4xl lg:text-5xl font-black text-[#ff8888]">24/7</div>
                            <div className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-[0.2em] font-semibold">Live Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a14] to-transparent pointer-events-none" />
        </div>
    );
}