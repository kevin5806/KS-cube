let camera, scene, renderer, cube;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement).classList.add("cubo");

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.BoxGeometry(3,3,3);

	// Create material with color
	//const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

	// Add texture - 
	 const texture = new THREE.TextureLoader().load('t1.png');

	// Create material with texture
	 const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material
	cube = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(cube);

	// Position camera
	//camera.position.x = 2;
	camera.position.z = 5;
	camera.position.y = 4;
	camera.lookAt(0, 0, 0);
	//camera.rotation.y = 0.25;
	//camera.rotation.x = -0.25;
	//camera.rotation.z = 0.08; 
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.y += -0.005;
	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
