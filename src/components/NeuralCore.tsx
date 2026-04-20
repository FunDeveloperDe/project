import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const isLowEnd = navigator.hardwareConcurrency <= 4 || /Mobi/i.test(navigator.userAgent);

const vertexShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float displacement = sin(pos.x * 3.0 + uTime) * sin(pos.y * 3.0 + uTime * 1.3) * 0.12;
  pos += normal * displacement;
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uColorBase;
uniform vec3 uColorFresnel;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 2.5);

  vec3 color = mix(uColorBase, uColorFresnel, fresnel);
  float alpha = 0.15 + fresnel * 0.5;

  gl_FragColor = vec4(color, alpha);
}
`;

interface NeuralCoreProps {
  scrollRef: React.MutableRefObject<number>;
}

export default function NeuralCore({ scrollRef }: NeuralCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEnd,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowEnd ? 1.0 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    const nodeCount = isLowEnd ? 60 : 120;
    const nodes: THREE.Mesh[] = [];
    const nodeVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const r = 8 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.1, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.3 ? 0x00D4FF : 0x7B61FF,
        transparent: true,
        opacity: 0.7
      });

      const node = new THREE.Mesh(geometry, material);
      node.position.set(x, y, z);
      node.userData.phase = Math.random() * Math.PI * 2;
      scene.add(node);
      nodes.push(node);

      nodeVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ));
    }

    const coreGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorBase: { value: new THREE.Color(0x008BD9) },
        uColorFresnel: { value: new THREE.Color(0x7B61FF) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const wireframeGeometry = new THREE.IcosahedronGeometry(2.6, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x7B61FF,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    const ringGeometry = new THREE.TorusGeometry(12, 0.04, 4, 80);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7B61FF,
      transparent: true,
      opacity: 0.12
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const particleCount = isLowEnd ? 200 : 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 80;
      particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7B61FF,
      size: 0.07,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let linesMesh: THREE.LineSegments | null = null;
    const distanceThreshold = isLowEnd ? 9 : 7;
    let frameCount = 0;

    const updateConnections = () => {
      if (linesMesh) scene.remove(linesMesh);

      const positions: number[] = [];
      const colors: number[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          if (distance < distanceThreshold) {
            positions.push(
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            );

            const opacity = 0.1 * (1 - distance / distanceThreshold);
            colors.push(0, 0.831, 1, opacity);
            colors.push(0, 0.831, 1, opacity);
          }
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      linesMesh = new THREE.LineSegments(geometry, material);
      scene.add(linesMesh);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const currentPos = { x: 0, y: 0, z: 35 };
    let time = 0;

    const animate = () => {
      time += 0.016;
      frameCount++;

      coreMaterial.uniforms.uTime.value = time;

      nodes.forEach((node, i) => {
        node.position.add(nodeVelocities[i]);

        if (Math.abs(node.position.x) > 25) nodeVelocities[i].x *= -1;
        if (Math.abs(node.position.y) > 20) nodeVelocities[i].y *= -1;
        if (Math.abs(node.position.z) > 20) nodeVelocities[i].z *= -1;

        const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + node.userData.phase);
        (node.material as THREE.MeshBasicMaterial).opacity = 0.4 + 0.6 * pulse;
        node.scale.setScalar(0.85 + 0.3 * pulse);
      });

      if (frameCount % 4 === 0) {
        updateConnections();
      }

      ring.rotation.z += 0.004;

      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.0015;
      }
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.0004;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      const scroll = scrollRef.current;
      const targetZ = 35 - scroll * 20;
      const targetY = scroll * 8;
      const targetX = Math.sin(scroll * Math.PI) * 5;

      const mouseOffsetX = mouseRef.current.x * 3;
      const mouseOffsetY = mouseRef.current.y * 2;

      currentPos.x += ((targetX + mouseOffsetX) - currentPos.x) * 0.04;
      currentPos.y += ((targetY + mouseOffsetY) - currentPos.y) * 0.04;
      currentPos.z += (targetZ - currentPos.z) * 0.04;

      camera.position.set(currentPos.x, currentPos.y, currentPos.z);
      camera.lookAt(0, targetY * 0.3, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [scrollRef]);

  return <div ref={containerRef} className="fixed inset-0 z-[1]" />;
}
