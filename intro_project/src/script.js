import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Texture Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/172_norm.JPG')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.3, 64, 64)

// Materials

//can also define in the material constructor
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
const sphere2 = new THREE.Mesh(geometry, material)
const sphere3 = new THREE.Mesh(geometry, material)
//add first sphere
scene.add(sphere)
//add second sphere
sphere2.position.x += 1
scene.add(sphere2)
//add third sphere
sphere3.position.x += -1
scene.add(sphere3)

// Lights

//point light 1
const pointLight = new THREE.PointLight(0x0000ff, 2, 100)
pointLight.position.set(.86, -1.12, 1)
pointLight.intensity = 3
scene.add(pointLight)

const light1 = gui.addFolder('Light1')
// light1.add(pointLight, 'intensity').min(0).max(20).step(1)
// //helper for point light 1
// const pointLightHelper1 = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper1)


//point light 2
const pointLight2 = new THREE.PointLight(0x00ff00, 2, 100)
pointLight2.position.set(-11.27, 3, -3)
pointLight2.intensity = 3
scene.add(pointLight2)
// const light2 = gui.addFolder('Light2')
// light2.add(pointLight2.position, 'x').min(-20).max(3).step(0.01)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(20).step(1)

//add helper for point light
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

// const light2color = {
//     color: 0xff0000
// }

// light2.addColor(light2color, 'color')
//     .onChange(() => pointLight2.color.set(light2color.color))


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


//rotate when we move the mouse
document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.001
}

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects -- constant movement
    sphere.rotation.y = .5 * elapsedTime
    sphere2.rotation.z = .5 * elapsedTime
    sphere3.rotation.z = .5 * elapsedTime

    // sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    // sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    // sphere.position.z += .05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()