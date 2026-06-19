import * as THREE from 'three';

export interface ThreeScene {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  dispose: () => void;
  updateMouse: (x: number, y: number) => void;
}

export function createHeroScene(canvas: HTMLCanvasElement): ThreeScene {
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 6);

  // ── Lights ──────────────────────────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x7c3aed, 4, 20);
  pointLight1.position.set(-4, 3, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 20);
  pointLight2.position.set(4, -2, 3);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xec4899, 2, 15);
  pointLight3.position.set(0, 4, -2);
  scene.add(pointLight3);

  // ── Toon Material helper ─────────────────────────────────────────────────────
  function makeToon(color: number) {
    const gradient = new THREE.DataTexture(
      new Uint8Array([0, 60, 120, 180, 255]),
      5, 1,
      THREE.RedFormat
    );
    gradient.needsUpdate = true;
    const mat = new THREE.MeshToonMaterial({ color, gradientMap: gradient });
    return mat;
  }

  // ── Geometries ───────────────────────────────────────────────────────────────
  const objects: THREE.Mesh[] = [];

  // Central icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(1.1, 0);
  const icoMat = makeToon(0x7c3aed);
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(0, 0, 0);
  scene.add(ico);
  objects.push(ico);

  // Small torus
  const torusGeo = new THREE.TorusGeometry(0.5, 0.18, 12, 32);
  const torusMat = makeToon(0x06b6d4);
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(2.2, 0.8, -1);
  scene.add(torus);
  objects.push(torus);

  // Octahedron
  const octGeo = new THREE.OctahedronGeometry(0.65, 0);
  const octMat = makeToon(0xec4899);
  const oct = new THREE.Mesh(octGeo, octMat);
  oct.position.set(-2.4, -0.5, -0.5);
  scene.add(oct);
  objects.push(oct);

  // Tiny spheres scattered
  const sphereGeo = new THREE.SphereGeometry(0.2, 8, 8);
  const spherePositions = [
    [-1.8, 1.8, 0.5],
    [1.5, -1.5, 0.2],
    [2.8, -0.3, -1.5],
    [-2.8, 1.2, -1],
  ] as [number, number, number][];

  const sphereColors = [0xa855f7, 0x22d3ee, 0x7c3aed, 0x06b6d4];

  spherePositions.forEach(([x, y, z], i) => {
    const mat = makeToon(sphereColors[i]);
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    objects.push(mesh);
  });

  // ── Particle system ──────────────────────────────────────────────────────────
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xa855f7,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  function updateMouse(x: number, y: number) {
    mouseX = x;
    mouseY = y;
  }

  // ── Animation loop ──────────────────────────────────────────────────────────
  let frameId: number;
  const clock = new THREE.Clock();

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Rotate main objects
    ico.rotation.x = t * 0.3;
    ico.rotation.y = t * 0.4;

    torus.rotation.x = t * 0.5 + Math.sin(t * 0.3) * 0.2;
    torus.rotation.y = t * 0.3;

    oct.rotation.x = -t * 0.4;
    oct.rotation.y = t * 0.5;

    // Float animations
    ico.position.y = Math.sin(t * 0.7) * 0.15;
    torus.position.y = 0.8 + Math.sin(t * 0.9 + 1) * 0.2;
    oct.position.y = -0.5 + Math.sin(t * 0.6 + 2) * 0.18;

    // Scatter spheres float
    objects.slice(3).forEach((obj, i) => {
      obj.position.y = spherePositions[i][1] + Math.sin(t * (0.6 + i * 0.1) + i) * 0.12;
    });

    // Particles slow rotation
    particles.rotation.y = t * 0.03;
    particles.rotation.x = t * 0.015;

    // Camera parallax from mouse
    camera.position.x += (-targetX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (targetY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Pulsing lights
    pointLight1.intensity = 3.5 + Math.sin(t * 1.2) * 0.8;
    pointLight2.intensity = 3 + Math.cos(t * 0.9) * 0.7;

    renderer.render(scene, camera);
  }

  animate();

  // ── Resize handler ──────────────────────────────────────────────────────────
  function handleResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  window.addEventListener('resize', handleResize);

  function dispose() {
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    objects.forEach((obj) => {
      obj.geometry.dispose();
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else {
        obj.material.dispose();
      }
    });
  }

  return { renderer, scene, camera, dispose, updateMouse };
}
