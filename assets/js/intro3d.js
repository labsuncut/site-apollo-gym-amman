// APOLLO intro, 3D version. Marble columns, a stone plinth, the Apollo mark dropping
// onto it out of the dark, the sign lighting up, then the camera walks on into the gym.
// Everything is built in code (no model files): the mark is the traced logo path extruded,
// the marble and granite are painted onto canvases, the lights are three lamps and fog.
// site.js decides whether this runs (WebGL present) and provides the shared ending.
import * as THREE from './vendor/three.module.min.js';

const A = window.APOLLO;
const canvas = document.getElementById('loader-3d');
if (A && canvas && window.gsap && !A.fallback) {
  try { run(); } catch (err) { console.warn('3D intro failed, using the CSS one', err); if (!A.started) { clearTimeout(A.timer); A.domIntro(); } }
}

function run() {
  // ---------- Renderer, scene, camera ----------
  const phone = window.matchMedia('(max-width: 720px)').matches;
  const lite = /[?&]lite\b/.test(location.search); // test rigs without a GPU
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(lite ? 1 : Math.min(devicePixelRatio, phone ? 2 : 1.75));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = lite ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07070a);
  scene.fog = new THREE.FogExp2(0x07070a, 0.075);

  const camera = new THREE.PerspectiveCamera(phone ? 48 : 36, innerWidth / innerHeight, 0.1, 60);
  const cam = { x: 0, y: 1.35, z: phone ? 9.5 : 8.2, tx: 0, ty: 1.0, shake: 0 };

  // ---------- Painted textures ----------
  const noise = makeNoise(1234);
  const fbm = (x, y, o = 4) => { let v = 0, a = .5, f = 1; for (let i = 0; i < o; i++) { v += a * noise(x * f, y * f); a *= .5; f *= 2.1; } return v; };
  const paint = (size, fn) => {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const ctx = c.getContext('2d'), img = ctx.createImageData(size, size), d = img.data;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const i = (y * size + x) * 4; const [r, g, b] = fn(x / size, y / size); d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255; }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  const S = 256; // painted once at load; 256px tiles keep this under a quarter second on a phone
  // Marble: warm ivory with grey-brown veins that wander.
  const marble = paint(S, (u, v) => {
    const warp = fbm(u * 2.5 + 7, v * 2.5 + 3, 2);
    const vein = Math.pow(Math.abs(Math.sin((u * 3.1 + v * 6.3 + warp * 3.4) * Math.PI)), 26) * 0.22
      + Math.pow(Math.abs(Math.sin((u * 7.3 - v * 4.1 + warp * 2.1) * Math.PI)), 40) * 0.1;
    const grain = fbm(u * 30, v * 30, 2) * 0.09 - 0.045;
    const base = 0.84 + grain;
    const r = 255 * (base - vein), g = 255 * (base * 0.975 - vein * 1.05), b = 255 * (base * 0.935 - vein * 1.1);
    return [r, g, b];
  });
  const marbleRough = paint(S / 2, (u, v) => { const n = 0.55 + fbm(u * 9, v * 9, 2) * 0.3; const c = 255 * n; return [c, c, c]; });
  marbleRough.colorSpace = THREE.NoColorSpace;
  // Granite: dark grey, speckled, rough.
  const granite = paint(S, (u, v) => {
    const n = fbm(u * 26, v * 26, 3);
    const speck = noise(u * 160, v * 160) > 0.86 ? 0.35 : 0;
    const dark = noise(u * 90 + 5, v * 90) < -0.8 ? -0.12 : 0;
    const l = 0.2 + n * 0.16 + speck + dark;
    return [255 * l * 0.98, 255 * l, 255 * l * 1.05];
  });
  const graniteBump = paint(S / 2, (u, v) => { const c = 255 * (0.5 + fbm(u * 40, v * 40, 3) * 0.5); return [c, c, c]; });
  graniteBump.colorSpace = THREE.NoColorSpace;

  const marbleMat = new THREE.MeshStandardMaterial({ map: marble, roughnessMap: marbleRough, roughness: 0.62, metalness: 0.02, bumpMap: marbleRough, bumpScale: 0.012 });
  const graniteMat = new THREE.MeshStandardMaterial({ map: granite, bumpMap: graniteBump, bumpScale: 0.03, roughness: 0.88, metalness: 0.05 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0f, roughness: 0.32, metalness: 0.6 });
  const logoMat = new THREE.MeshPhysicalMaterial({ color: 0xd41f2c, roughness: 0.3, metalness: 0.18, clearcoat: 1, clearcoatRoughness: 0.12, emissive: 0xff2d3f, emissiveIntensity: 0 });

  // ---------- Floor ----------
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), floorMat);
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  // A faint grid of floor slabs, so the walk-in reads as movement.
  const seams = new THREE.GridHelper(60, 30, 0x1a1a1f, 0x141418); seams.position.y = 0.002; scene.add(seams);

  // ---------- Stone plinth ----------
  const plinthShape = new THREE.Shape();
  const pw = 0.85, pd = 0.55;
  plinthShape.moveTo(-pw, -pd); plinthShape.lineTo(pw, -pd); plinthShape.lineTo(pw, pd); plinthShape.lineTo(-pw, pd); plinthShape.closePath();
  const plinthGeo = new THREE.ExtrudeGeometry(plinthShape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 3 });
  plinthGeo.rotateX(-Math.PI / 2);
  fixUv(plinthGeo, 1.4);
  const plinth = new THREE.Mesh(plinthGeo, graniteMat);
  plinth.castShadow = plinth.receiveShadow = true; scene.add(plinth);
  const plinthTop = 0.5 + 0.035;
  // Red light line in the plinth, off until the mark lands.
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff2d3f, transparent: true, opacity: 0 });
  const glowLine = new THREE.Mesh(new THREE.BoxGeometry(pw * 2 + 0.08, 0.012, pd * 2 + 0.08), glowMat);
  glowLine.position.y = 0.33; scene.add(glowLine);
  const glowLight = new THREE.PointLight(0xff2d3f, 0, 4, 2); glowLight.position.set(0, 0.5, 0.6); scene.add(glowLight);

  // ---------- The mark, extruded from the traced logo ----------
  const pts = [[42, 3], [3, 97], [44, 97], [28, 76], [50, 22], [72, 76], [56, 97], [97, 97], [58, 3]];
  const H = 1.3, k = H / 94;
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => { const X = (x - 50) * k, Y = (97 - y) * k; i ? shape.lineTo(X, Y) : shape.moveTo(X, Y); });
  shape.closePath();
  const logoGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.018, bevelSegments: 3 });
  logoGeo.center();
  const logo = new THREE.Mesh(logoGeo, logoMat);
  logo.castShadow = true;
  const logoRest = plinthTop + H / 2 + 0.02;
  logo.position.set(0, logoRest + 5.5, 0);
  logo.rotation.x = -0.35;
  scene.add(logo);
  // Soft red halo behind the mark (a sprite with a radial gradient), off until lit.
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial(), color: 0xff2d3f, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.set(4, 4, 1); halo.position.set(0, logoRest, -0.25); scene.add(halo);

  // ---------- Marble columns ----------
  const colR = 0.3, colH = 5.2;
  const colGeo = fluted(colR, colH, 24);
  const makeColumn = (x, z) => {
    const g = new THREE.Group();
    const shaft = new THREE.Mesh(colGeo, marbleMat); shaft.position.y = colH / 2 + 0.2; shaft.castShadow = shaft.receiveShadow = true; g.add(shaft);
    const base1 = new THREE.Mesh(new THREE.BoxGeometry(colR * 2.9, 0.12, colR * 2.9), marbleMat); base1.position.y = 0.06; base1.castShadow = base1.receiveShadow = true; g.add(base1);
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(colR * 1.22, colR * 1.3, 0.1, 40), marbleMat); base2.position.y = 0.17; base2.castShadow = true; g.add(base2);
    const cap1 = new THREE.Mesh(new THREE.CylinderGeometry(colR * 1.3, colR * 1.02, 0.22, 40), marbleMat); cap1.position.y = colH + 0.2 + 0.11; g.add(cap1);
    const cap2 = new THREE.Mesh(new THREE.BoxGeometry(colR * 3.1, 0.14, colR * 3.1), marbleMat); cap2.position.y = colH + 0.2 + 0.29; g.add(cap2);
    g.position.set(x, 0, z);
    scene.add(g);
    return g;
  };
  const colX = phone ? 1.6 : 2.3;
  makeColumn(-colX, -0.9); makeColumn(colX, -0.9);
  makeColumn(-colX * 1.9, -5.5); makeColumn(colX * 1.9, -5.5);
  // Lintel across the front pair, mostly lost in the dark above.
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(colX * 2 + colR * 3.4, 0.5, colR * 3.4), marbleMat);
  lintel.position.set(0, colH + 0.2 + 0.36 + 0.25, -0.9); scene.add(lintel);

  // ---------- Lights ----------
  scene.add(new THREE.AmbientLight(0x3a2426, 0.35));
  const key = new THREE.SpotLight(0xfff0e4, 0, 18, 0.55, 0.6, 1.2);
  key.position.set(0.6, 7.5, 2.4); key.target.position.set(0, 0.6, 0); key.castShadow = true;
  key.shadow.mapSize.set(lite ? 512 : phone ? 1024 : 2048, lite ? 512 : phone ? 1024 : 2048); key.shadow.bias = -0.0005; key.shadow.radius = 4;
  scene.add(key, key.target);
  const rim = new THREE.PointLight(0xff2d3f, 0, 9, 1.6); rim.position.set(0, 1.8, -1.6); scene.add(rim);
  const fill = new THREE.PointLight(0xffb088, 0, 12, 1.8); fill.position.set(-3.2, 2.4, 3.2); scene.add(fill);

  // ---------- Dust ----------
  const N = 160, dustPos = new Float32Array(N * 3), dustVel = new Float32Array(N * 3);
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0xd8c8b8, size: 0.035, transparent: true, opacity: 0, depthWrite: false, map: radial(), blending: THREE.AdditiveBlending });
  const dust = new THREE.Points(dustGeo, dustMat); scene.add(dust);
  let dustLife = 0;
  const burst = () => {
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, r = 0.25 + Math.random() * 0.5;
      dustPos[i * 3] = Math.cos(a) * r * 0.9; dustPos[i * 3 + 1] = plinthTop + 0.02; dustPos[i * 3 + 2] = Math.sin(a) * r * 0.6;
      dustVel[i * 3] = Math.cos(a) * (0.8 + Math.random() * 1.6); dustVel[i * 3 + 1] = 0.6 + Math.random() * 1.8; dustVel[i * 3 + 2] = Math.sin(a) * (0.8 + Math.random() * 1.6);
    }
    dustGeo.attributes.position.needsUpdate = true; dustLife = 1; dustMat.opacity = 0.9;
  };

  // ---------- Render loop ----------
  let last = performance.now(), alive = true, yaw = 0;
  const resize = () => { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); };
  addEventListener('resize', resize);
  const tick = (now) => {
    if (!alive) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (dustLife > 0) {
      dustLife -= dt * 0.9;
      for (let i = 0; i < N; i++) { dustPos[i * 3] += dustVel[i * 3] * dt; dustPos[i * 3 + 1] += dustVel[i * 3 + 1] * dt; dustPos[i * 3 + 2] += dustVel[i * 3 + 2] * dt; dustVel[i * 3 + 1] -= 2.2 * dt; dustVel[i * 3] *= 0.96; dustVel[i * 3 + 2] *= 0.96; }
      dustGeo.attributes.position.needsUpdate = true; dustMat.opacity = Math.max(0, dustLife) * 0.9;
    }
    const sh = cam.shake ? (Math.random() - 0.5) * cam.shake : 0, sv = cam.shake ? (Math.random() - 0.5) * cam.shake * 0.6 : 0;
    camera.position.set(cam.x + sh, cam.y + sv, cam.z);
    camera.lookAt(cam.tx, cam.ty, 0);
    logo.rotation.y = yaw;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  document.querySelector('.seam').style.animation = 'none';
  // ---------- The timeline ----------
  const flick = [1, .12, 1, .08, .85, .2, 1];
  const intro = gsap.timeline({ onComplete: () => { alive = false; renderer.dispose(); A.finishIntro(); } });
  intro
    // the seam of light and the doors
    .to('.seam', { opacity: 1, scaleY: 1, duration: .5, ease: 'power2.out' }, .1)
    .to('.door-l', { xPercent: -100, duration: 1.1, ease: 'expo.inOut' }, .55)
    .to('.door-r', { xPercent: 100, duration: 1.1, ease: 'expo.inOut' }, .55)
    .to('.seam', { opacity: 0, duration: .35 }, .65)
    // the lamps come up as you step in
    .to(key, { intensity: phone ? 120 : 150, duration: 1.6, ease: 'power2.out' }, .6)
    .to(fill, { intensity: 14, duration: 1.6, ease: 'power2.out' }, .7)
    .to(rim, { intensity: 10, duration: 1.4, ease: 'power2.out' }, .9)
    // walking in between the columns
    .to(cam, { z: phone ? 5.2 : 3.9, y: 1.15, duration: 2.2, ease: 'power2.inOut' }, .5)
    // the mark drops out of the dark and lands
    .to(logo.position, { y: logoRest, duration: .62, ease: 'power3.in' }, 2.0)
    .to(logo.rotation, { x: 0, duration: .62, ease: 'power2.in' }, 2.0)
    .add(() => { burst(); cam.shake = 0.09; glowMat.opacity = 1; glowLight.intensity = 6; key.intensity *= 1.5; }, 2.62)
    .to(logo.scale, { y: .86, x: 1.06, z: 1.06, duration: .07, ease: 'power1.out' }, 2.62)
    .to(logo.scale, { y: 1, x: 1, z: 1, duration: .5, ease: 'elastic.out(1, .45)' }, 2.69)
    .to(cam, { shake: 0, duration: .45, ease: 'power2.out' }, 2.66)
    .to(glowMat, { opacity: .5, duration: .7 }, 2.75)
    .to(glowLight, { intensity: 2.5, duration: .7 }, 2.75)
    .to(key, { intensity: phone ? 120 : 150, duration: .5 }, 2.75);
  // the sign flickers on
  flick.forEach((o, i) => intro.set(logoMat, { emissiveIntensity: o * .5 }, 2.8 + i * .07));
  intro.set(logoMat, { emissiveIntensity: .45 }, 3.3)
    .to(halo.material, { opacity: .55, duration: .5 }, 3.25)
    .to(rim, { intensity: 22, duration: .5 }, 3.25)
    // a slow turn so you see it is a real object
    .to({ v: -0.42 }, { v: 0.42, duration: 1.9, ease: 'sine.inOut', onUpdate() { yaw = this.targets()[0].v; } }, 3.1)
    .to(cam, { x: phone ? 0.45 : 0.8, duration: 1.9, ease: 'sine.inOut' }, 3.1)
    .to('.loader-word span', { opacity: 1, scale: 1, duration: .5, stagger: .04, ease: 'power3.out' }, 3.0)
    .to('.loader-tag', { opacity: 1, duration: .45 }, 3.45)
    .to('.loader-bar i', { scaleX: 1, duration: 5.0, ease: 'power2.inOut' }, .3)
    // and on into the gym
    .to(cam, { z: 0.7, x: 0, ty: logoRest, duration: 1.2, ease: 'power2.in' }, 4.4)
    .to(halo.material, { opacity: 1, duration: .6 }, 4.9)
    .to('.loader-scene', { opacity: 0, duration: .4 }, 4.7)
    .to('#loader', { opacity: 0, duration: .5, ease: 'power2.in' }, 5.15);
  A.heroIn(intro, 5.15);
  if (A.fallback) { alive = false; intro.kill(); renderer.dispose(); return; }
  A.started = true; clearTimeout(A.timer);
  A.armIntro(intro);

  // ---------- helpers ----------
  function fluted(r, h, flutes) {
    const g = new THREE.CylinderGeometry(r, r * 1.04, h, flutes * 6, 1, false);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), y = p.getY(i);
      const th = Math.atan2(z, x), rr = Math.hypot(x, z);
      if (rr < 1e-6) continue;
      const cut = Math.pow(Math.max(0, Math.cos(th * flutes)), 1.6) * 0.06;
      const end = Math.min(1, Math.max(0, (h / 2 - Math.abs(y)) / 0.35)); // flutes fade at the ends
      const nr = rr * (1 - cut * end);
      p.setXYZ(i, Math.cos(th) * nr, y, Math.sin(th) * nr);
    }
    g.computeVertexNormals();
    fixUv(g, 2.2);
    return g;
  }
  function fixUv(g, scale) { const uv = g.attributes.uv; if (!uv) return; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * scale, uv.getY(i) * scale); uv.needsUpdate = true; }
  function radial() {
    const c = document.createElement('canvas'); c.width = c.height = 128; const ctx = c.getContext('2d');
    const gr = ctx.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.35, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c); return t;
  }
  function makeNoise(seed) {
    // Value noise with smooth interpolation; enough for marble and stone.
    const perm = new Uint8Array(512); let s = seed;
    const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    const p = Array.from({ length: 256 }, (_, i) => i); for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const val = (ix, iy) => perm[(perm[ix & 255] + iy) & 255] / 127.5 - 1;
    return (x, y) => {
      const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, u = fade(fx), v = fade(fy);
      const a = val(x0, y0), b = val(x0 + 1, y0), c = val(x0, y0 + 1), d = val(x0 + 1, y0 + 1);
      return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
    };
  }
}
