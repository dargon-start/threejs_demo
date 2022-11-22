import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0,0,10);
scene.add(camera);

//添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0x00ffff});

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

// 初始化渲染器
const render = new THREE.WebGL1Renderer();
render.setSize(window.innerWidth,window.innerHeight);


// 挂在到dom中
document.body.appendChild(render.domElement);



// 控制器
const controls = new OrbitControls(camera,render.domElement);
// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

controls.update()

// cube.scale.set(1,2,1);

// cube.rotation.set(Math.PI / 4,0,0);

const clock = new THREE.Clock();
function animate(){
    // cube.position.x +=  0.01;
    // cube.rotation.x += 0.01;

    // if(cube.position.x>5){
    //     cube.position.x = 0;
    // }
    console.log(clock.getElapsedTime());

    let time = clock.getElapsedTime();
    cube.position.x = time * 1;
    cube.rotation.x = time * 1;
    if(cube.position.x>5){
        cube.position.x = 0;
        clock.start()
    }
    // 通过渲染器渲染场景和相机
    render.render(scene,camera);
    controls.update()
    requestAnimationFrame(animate)
}

animate()

console.log('fewa');