let camera, scene, renderer, cube;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function randomColor() {

	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	const saturation = Math.max(r, g, b) - Math.min(r, g, b) > 48 ? 1 : 0.5;
	const hue = Math.floor(Math.random() * 360) / 360;

	const { r: finalR, g: finalG, b: finalB } = hslToRgb(hue, saturation, luminosity);
	const color = (finalR << 16) | (finalG << 8) | finalB;
	return color;
}
  

function hslToRgb(h, s, l) {
	let r, g, b;
  
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}
	
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
  
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	}
}

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

	renderer.setClearColor( randomColor() );

	// Render to canvas element
	document.body.appendChild(renderer.domElement).classList.add("cubo");

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.BoxGeometry(3,3,3);

	// Create material with color
	//const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	
	let textureName = `t${getRandomInt(6)+1}.png `;

	console.log(getRandomInt(5));

	// Add texture - 
	 const texture = new THREE.TextureLoader().load("https://source.unsplash.com/random/?texture");

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

let countz = 0;
let salvoValorez = valore();

let countx = 0;
let salvoValorex = valore();

let county = 0;
let salvoValorey = valore();

function valore() {
	let valore;

	if (Math.random() < 0.5) {
		valore = -5 / 1200;
	} else {
		valore = 5 / 800;
	}

	return valore;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	if (countz < 600) {

		cube.rotation.z += salvoValorez
		countz++;

	} else {
		countz = 0;

		salvoValorez = valore();

		cube.rotation.z += salvoValorez;
	}

	if (countx < 500) {

		cube.rotation.x += salvoValorex
		countx++;

	} else {
		countx = 0;

		salvoValorex = valore();

		cube.rotation.x += salvoValorez;
	}

	if (county < 700) {

		cube.rotation.y += salvoValorez
		county++;

	} else {
		county = 0;

		salvoValorey = valore();

		cube.rotation.y += salvoValorez;
	}

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
