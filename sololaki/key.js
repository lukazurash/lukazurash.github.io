// The hotel's brass room key with a vermilion tassel, built from three.js primitives (no model file).
// It turns slowly and follows the scroll; it stops drawing when off screen. still: one frame, no motion.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

export function mountKey(canvas, { still = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  scene.add(new THREE.HemisphereLight(0xfff1d6, 0x0f372b, 1.1));
  const key = new THREE.DirectionalLight(0xffe2b0, 3.2); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0xe8392b, 9, 12); rim.position.set(-3, -1, 2); scene.add(rim);

  const brass = new THREE.MeshStandardMaterial({ color: 0xc4943f, metalness: 0.9, roughness: 0.32 });
  const red = new THREE.MeshStandardMaterial({ color: 0xe8392b, roughness: 0.75 });

  const g = new THREE.Group();
  // the bow: an outer ring with a four-petal cut-out, the shape of the house's mark
  const bow = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.13, 24, 64), brass); bow.position.y = 1.55; g.add(bow);
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 32), brass);
    const a = i * Math.PI / 2; p.position.set(Math.cos(a) * 0.24, 1.55 + Math.sin(a) * 0.24, 0); g.add(p);
  }
  // collar rings and the shaft
  [0.82, 0.68].forEach(y => { const c = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.06, 12, 32), brass); c.rotation.x = Math.PI / 2; c.position.y = y; g.add(c); });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.5, 24), brass); shaft.position.y = -0.55; g.add(shaft);
  // the bit, stepped like an old mortice key
  [[0.34, 0.2, -1.42], [0.22, 0.14, -1.62], [0.3, 0.16, -1.2]].forEach(([w, h, y]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.09), brass); b.position.set(0.1 + w / 2, y, 0); g.add(b);
  });
  // the tassel: a cord loop through the bow, a knot and the fringe
  const cord = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 10, 32), red); cord.position.set(0, 2.25, 0); cord.rotation.y = Math.PI / 2; g.add(cord);
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 16), red); knot.position.set(0, 2.5, 0); g.add(knot);
  const fringe = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.7, 24, 1, true), red); fringe.position.set(0, 2.9, 0); g.add(fringe);
  g.position.y = -0.55; // the key hangs from its tassel, bit at the foot
  g.scale.setScalar(0.8);
  scene.add(g);

  const size = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height; camera.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  // the still key.png behind the canvas stays until a frame has really drawn (a refused shader keeps it)
  let failed = false;
  renderer.debug.onShaderError = () => { failed = true; };
  const live = () => { if (!failed && !renderer.getContext().isContextLost()) { canvas.parentElement.classList.add('is-live'); size(); renderer.render(scene, camera); } };
  if (still) { g.rotation.y = -0.6; renderer.render(scene, camera); live(); return; }
  renderer.render(scene, camera); live();

  let visible = true, t0 = performance.now();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  const tick = now => {
    requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const t = (now - t0) / 1000;
    g.rotation.y = t * 0.45 + scrollY * 0.006;
    g.rotation.x = Math.sin(t * 0.7) * 0.08;
    renderer.render(scene, camera);
  };
  requestAnimationFrame(tick);
}
