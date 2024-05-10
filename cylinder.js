const scene = new THREE.Scene();
scene.background = new THREE.Color('#222222');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let radius = 2;
let height = 5;
let segments = 8;
let isRotating = false;
let showWireframe = false;


let geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
const material = new THREE.MeshPhongMaterial({
	color: 0x666666,
});
let cylinder = new THREE.Mesh(geometry, material);


scene.add(cylinder);


camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 15;
camera.lookAt(scene.position);



const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);


renderer.render(scene, camera);


function updateCylinder() {
	scene.remove(cylinder);

	geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
	cylinder = new THREE.Mesh(geometry, material);

	scene.add(cylinder);

	renderer.render(scene, camera);
}

document.getElementById('radiusSlider').addEventListener('input', function (e) {
	radius = parseFloat(e.target.value);
	updateCylinder();
});

document.getElementById('heightSlider').addEventListener('input', function (e) {
	height = parseFloat(e.target.value);
	updateCylinder();
});

document.getElementById('segmentsSlider').addEventListener('input', function (e) {
	segments = parseInt(e.target.value);
	updateCylinder();
});


function animate() {
	requestAnimationFrame(animate);

	if (isRotating) {
		cylinder.rotation.y += 0.01;
	}

	if (cylinder.material.wireframe !== showWireframe) {
		cylinder.material.wireframe = showWireframe;
	}

	renderer.render(scene, camera);
}
animate();


document.getElementById('rotateCheckbox').addEventListener('change', function (e) {
	isRotating = e.target.checked;
});


document.getElementById('wireframeCheckbox').addEventListener('change', function (e) {
	showWireframe = e.target.checked;
});