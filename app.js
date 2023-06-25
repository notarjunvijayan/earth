import * as THREE from 'three'

//Sizes
const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}
//Load Textures
const texture = new THREE.TextureLoader().load('public/static/textures/earth.png')

//Scene
const scene = new THREE.Scene()
//Create Sphere
const sphere = new THREE.SphereGeometry(3,120,120);
const material = new THREE.MeshStandardMaterial();
material.map = texture
const mesh = new THREE.Mesh(sphere,material)
scene.add(mesh)



//Light
const light1 = new THREE.PointLight(0xffffff,1,100)
light1.position.set(10,0,20)

scene.add(light1)

//Camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width/sizes.height,
     0.1,
     100
    )
camera.position.z = 10
scene.add(camera)

//Render
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.antialias = true
renderer.setClearAlpha()
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
renderer.outputColorSpace = THREE.SRGBColorSpace; 
 

//Resize
window.addEventListener("resize",()=>{
    sizes.height = window.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = (sizes.width/sizes.height)
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//Animate
const loop=()=>{
    sphere.rotateY(0.001)
    
    if(camera.position.z > 8){
        camera.position.z -= 0.0095
    }
    console.log(camera.position)
    renderer.render(scene,camera);
    window.requestAnimationFrame(loop)
}
loop()