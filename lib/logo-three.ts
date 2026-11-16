import {
  AmbientLight,
  Box3,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Shape,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";

// The two strokes of the Nusatech "N", in the same 500x500 space as the SVG mark.
const LEFT = [
  [104, 96],
  [136, 96],
  [276, 177],
  [276, 235],
  [161, 169],
  [161, 403],
  [104, 403],
  [104, 252],
  [45, 218],
  [45, 161],
  [104, 195],
];
const RIGHT = [
  [340, 96],
  [397, 96],
  [397, 246],
  [455, 280],
  [455, 337],
  [397, 304],
  [397, 403],
  [364, 403],
  [223, 323],
  [223, 265],
  [340, 331],
];

const toShape = (points: number[][]) => {
  const shape = new Shape();
  // SVG y runs down, three's runs up; centre the mark on the origin.
  points.forEach(([x, y], i) =>
    i ? shape.lineTo(x - 250, 250 - y) : shape.moveTo(x - 250, 250 - y),
  );
  shape.closePath();
  return shape;
};

const EXTRUDE = {
  depth: 44,
  bevelEnabled: true,
  bevelThickness: 6,
  bevelSize: 4,
  bevelSegments: 3,
};

// Resting angle: turned enough that the extrusion reads as 3D.
const REST = { x: 0.14, y: -0.42 };
const ENTRANCE_MS = 1300;

const easeOutBack = (t: number) => {
  const c = 1.3;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};

/**
 * Mounts the extruded logo into `host`. The two strokes slide in from either
 * side and lock together, then the mark turns toward the pointer over
 * `pointerArea`. Frames are drawn only while something is moving or the
 * canvas is resized, and never while the tile is off screen.
 * Returns a cleanup function; calls `onReady` after the first frame and
 * `onLost` if WebGL is unavailable or the context is lost.
 */
export function mountLogo(
  host: HTMLElement,
  pointerArea: HTMLElement,
  onReady: () => void,
  onLost: () => void,
): () => void {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
  } catch {
    onLost();
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 10, 6000);

  scene.add(new AmbientLight(0xffffff, 0.9));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(420, 620, 900);
  scene.add(key);
  const rim = new DirectionalLight(0x3db8ff, 1.6);
  rim.position.set(-700, -200, -400);
  scene.add(rim);

  const geometries = [
    new ExtrudeGeometry(toShape(LEFT), EXTRUDE),
    new ExtrudeGeometry(toShape(RIGHT), EXTRUDE),
  ];
  geometries.forEach((g) => g.translate(0, 0, -EXTRUDE.depth / 2));
  const materials = [
    new MeshStandardMaterial({
      color: 0x3db8ff,
      roughness: 0.32,
      metalness: 0.15,
    }),
    new MeshStandardMaterial({
      color: 0xeaf4fb,
      roughness: 0.4,
      metalness: 0.1,
    }),
  ];
  const left = new Mesh(geometries[0], materials[0]);
  const right = new Mesh(geometries[1], materials[1]);
  const mark = new Group();
  mark.add(left, right);
  mark.rotation.set(REST.x, REST.y, 0);
  scene.add(mark);

  // Fit the camera so the mark fills about 70% of the canvas height.
  const bounds = new Box3().setFromObject(mark).getSize(new Vector3());
  const fit = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const fov = (camera.fov * Math.PI) / 180;
    const byHeight = bounds.y / 0.7 / (2 * Math.tan(fov / 2));
    const byWidth = bounds.x / 0.7 / (2 * Math.tan(fov / 2) * camera.aspect);
    camera.position.set(0, 0, Math.max(byHeight, byWidth) + EXTRUDE.depth);
    camera.updateProjectionMatrix();
  };
  fit();

  const target = { ...REST };
  const start = performance.now();
  let entering = true;
  let visible = true;
  let frame = 0;
  let ready = false;

  const draw = () => {
    frame = 0;
    if (!visible) return;
    let moving = false;

    if (entering) {
      const t = Math.min((performance.now() - start) / ENTRANCE_MS, 1);
      const e = easeOutBack(t);
      left.position.set(-260 * (1 - e), 0, -160 * (1 - e));
      right.position.set(260 * (1 - e), 0, 160 * (1 - e));
      left.rotation.y = -0.6 * (1 - e);
      right.rotation.y = 0.6 * (1 - e);
      entering = t < 1;
      moving = true;
    }

    const dx = target.x - mark.rotation.x;
    const dy = target.y - mark.rotation.y;
    if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
      mark.rotation.x += dx * 0.08;
      mark.rotation.y += dy * 0.08;
      moving = true;
    }

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady();
    }
    if (moving) frame = requestAnimationFrame(draw);
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = pointerArea.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    target.y = REST.y + px * 0.9;
    target.x = REST.x + py * 0.5;
    wake();
  };
  const onPointerLeave = () => {
    target.x = REST.x;
    target.y = REST.y;
    wake();
  };
  pointerArea.addEventListener("pointermove", onPointerMove);
  pointerArea.addEventListener("pointerleave", onPointerLeave);

  const resize = new ResizeObserver(() => {
    fit();
    wake();
  });
  resize.observe(host);

  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  });
  seen.observe(host);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    onLost();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  wake();

  return () => {
    cancelAnimationFrame(frame);
    pointerArea.removeEventListener("pointermove", onPointerMove);
    pointerArea.removeEventListener("pointerleave", onPointerLeave);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    resize.disconnect();
    seen.disconnect();
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
    canvas.remove();
  };
}
