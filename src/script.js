import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import gsap from 'gsap';
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 32, 32);
let ig = new THREE.InstancedBufferGeometry();
console.log(ig);
ig.attributes = geometry.attributes;
ig.index = geometry.index;

let number = 1000;
let translateArray = new Float32Array(number * 3);
let rotateArray = new Float32Array(number);

let radius = 0.7;

for (let i = 0; i < number; i++) {
    let theta = Math.random() * 2 * Math.PI;
    translateArray.set([
        radius * Math.sin(theta),
        radius * Math.cos(theta),
        -Math.random() * 5
    ], 3 * i);

    rotateArray.set([
        Math.random() * 2 * Math.PI
    ], i);

}
ig.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3));
ig.setAttribute('aRotate', new THREE.InstancedBufferAttribute(rotateArray, 1));
// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load('/b.png') }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.MultiplyBlending

});

// Mesh
const mesh = new THREE.Mesh(ig, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 0.1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xe7e2e2, 1);
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();

    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();