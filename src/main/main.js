import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import * as dat from 'dat.gui';


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
// 设置阻尼
controls.enableDamping = true;
// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

controls.update()


// 无限循环：repeat:-1
// const animate1 =  gsap.to(cube.position,{x:5,duration:3,ease: "power1.inOut",repeat:-1,yoyo:true,delay:2,onComplete:()=>{
//     console.log('动画完成');
// },onStart:()=>{
//     console.log('动画开始');
// }})
// gsap.to(cube.rotation,{x:2 * Math.PI,duration:3,ease: "power1.inOut",repeat:-1})

// // 通过事件来控制动画的执行与暂停
// window.addEventListener('click',function(){
//     if(animate1.isActive()){
//         animate1.pause()
//     }else{
//         animate1.resume()
//     }
// })

// 进入或退出全屏 
window.addEventListener('dblclick',()=>{
    // 占据全屏的元素
    const fullElement = document.fullscreenElement;
    console.log(fullElement);
    if(!fullElement){
        render.domElement.requestFullscreen() 
    }else{
        document.exitFullscreen()
    }
})

function animate(){
     // 通过渲染器渲染场景和相机
    render.render(scene,camera);
    controls.update()
    requestAnimationFrame(animate)
}

animate()

// 创建gui
const gui = new dat.GUI();
// 添加position控制
gui.add(cube.position,'x').min(0).max(5).step(0.01).name('x坐标').onChange((value)=>{
    console.log(value);
}).onFinishChange((value)=>{
    console.log('finish',value);
})
//添加颜色控制
var palette = {
  color1: '#FF0000', // CSS string
};
gui.addColor(palette, 'color1').onChange((value)=>{
    console.log(value);
    cube.material.color.set(value)
}).name('颜色');
// 控制是否显示
gui.add(cube,'visible')
// 新建文件夹
const folder = gui.addFolder('folder');
// 文件下添加事件按钮
const params = {
    fn:()=>{
        console.log('111111');
        cube.material.wireframe = true
    }
}
folder.add(params,'fn')

// 时候发生变化时调整相机的参数
window.addEventListener('resize',()=>{
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 跟新摄像头的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    render.setSize(window.innerWidth,window.innerHeight);
    // 更新像素比
    render.setPixelRatio(window.devicePixelRatio)
})

console.log('fewa');