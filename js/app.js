if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, controls, scene, renderer;
var light, pointLight;

var spheres = [];
var mesh;
var material_sphere1, material_sphere2;

var analyser1, analyser2, analyser3;
var pathFlag = 0;
var spherePos, sphereZ, radius = 100, speed = 1;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED;

var clock = new THREE.Clock();
init();
animate();

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 25, 200 );

	listener = new THREE.AudioListener();
	Tone.setContext(listener.context);
	camera.add( listener );

	var ping = new Tone.PingPongDelay(.16, 0.2);

	var filter = new Tone.Filter(700, "lowpass").connect(ping);

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 0.5, 1 ).normalize();
	scene.add( light );

	var sphere = new THREE.SphereGeometry( 10, 16, 8 );

	material_sphere1 = new THREE.MeshPhongMaterial( { color: 0xffaa00, shading: THREE.FlatShading, shininess: 0 } );
	material_sphere2 = new THREE.MeshPhongMaterial( { color: 0xff2200, shading: THREE.FlatShading, shininess: 0 } );
	material_sphere3 = new THREE.MeshPhongMaterial( { color: 0x6622aa, shading: THREE.FlatShading, shininess: 0 } );

	// sound spheres

	var mesh1 = new THREE.Mesh( sphere, material_sphere1 );
	mesh1.position.set( -30, 30, 30 );
	scene.add( mesh1 );

	var sound1 = new THREE.PositionalAudio( listener );
	var synth1 = new Tone.AMSynth().connect(filter);
	synth1.set({
		volume: -35,
		oscillator:{
			type:"square"
		},
		filter:{
			Q:3,
			type:"allpass",
			rolloff:-24
		},
		envelope:{
			attack:0.3,
			decay:0,
			sustain:1,
			release:0.3
		},
		filterEnvelope:{
			attack:0.2,
			decay:0,
			sustain:1,
			release:0.2,
			min:20,
			max:20,
			exponent:2,
		}
	});

	sound1.setNodeSource(synth1);
	sound1.setRefDistance( 20 );
	sound1.setVolume(10);
	mesh1.add( sound1 );
	spheres.push( mesh1 );

	//

	var mesh2 = new THREE.Mesh( sphere, material_sphere2 );
	mesh2.position.set( 0, 30, 30 );
	scene.add( mesh2 );

	var sound2 = new THREE.PositionalAudio( listener );
	var synth2 = new Tone.FMSynth().connect(filter);
	synth2.set({
		volume: -35,
		oscillator:{
			type:"square"
		},
		filter:{
			Q:3,
			type:"allpass",
			rolloff:-24
		},
		envelope:{
			attack:0.3,
			decay:0,
			sustain:1,
			release:0.3
		},
		filterEnvelope:{
			attack:0.2,
			decay:0,
			sustain:1,
			release:0.2,
			min:20,
			max:20,
			exponent:2,
		}
	});

	sound2.setNodeSource(synth2);
	sound2.setRefDistance( 20 );
	sound2.setVolume(10);
	mesh2.add( sound2 );
	spheres.push( mesh2 );

	//


	var mesh3 = new THREE.Mesh( sphere, material_sphere3 );
	mesh3.position.set( 30, 30, 30 );
	scene.add( mesh3 );

	var sound3 = new THREE.PositionalAudio( listener );

	//a polysynth composed of 6 Voices of MonoSynth
	var synth = new Tone.PolySynth(20, Tone.MonoSynth).connect(filter);
	//set the attributes using the set interface
	synth.set({
		volume: -35,
		oscillator:{
			type:"square"
		},
		filter:{
			Q:3,
			type:"allpass",
			rolloff:-24
		},
		envelope:{
			attack:0.3,
			decay:0,
			sustain:1,
			release:0.3
		},
		filterEnvelope:{
			attack:0.2,
			decay:0,
			sustain:1,
			release:0.2,
			min:20,
			max:20,
			exponent:2,
		}
	});

	nx.onload = function() {
		
		nx.colorize("accent", "#0be");
		nx.colorize("fill", "#444449");

		matrix1.col = 8
		matrix1.row = 8
		matrix2.col = 8
		matrix2.row = 8
		matrix3.col = 8
		matrix3.row = 8
		matrix1.init()
		matrix2.init()
		matrix3.init()
		setInterval(matrix1.life,200)
		setInterval(matrix2.life,100)
		setInterval(matrix3.life,50)

		matrix1.on('*',function(data) {
			// synth.set("detune",~~(Math.random()*10-5))
			if (data.grid) {
				for (var i=0;i<data.grid.length;i++) {
					for (var j=0;j<data.grid[i].length;j++) {
						if (data.grid[i][j]) {
							synth.triggerAttackRelease((j+1)*(i+1)*8, .12);
							
						}
					}
				}
			}
		});
		matrix2.on('*',function(data) {
			// synth.set("detune",~~(Math.random()*10-5))
			if (data.grid) {
				for (var i=0;i<data.grid.length;i++) {
					for (var j=0;j<data.grid[i].length;j++) {
						if (data.grid[i][j]) {
							
							synth1.triggerAttackRelease((j+1)*(i+1)*9, .12);
							
						}
					}
				}
			}
		});
		matrix3.on('*',function(data) {
			// synth.set("detune",~~(Math.random()*10-5))
			if (data.grid) {
				for (var i=0;i<data.grid.length;i++) {
					for (var j=0;j<data.grid[i].length;j++) {
						if (data.grid[i][j]) {
							
							synth2.triggerAttackRelease((j+1)*(i+1)*10, .12);
						}
					}
				}
			}
		});
		toggle1.on('*', function(data) {
			// console.log(data);
			pathFlag = data.value;
		});

	}

	sound3.setNodeSource(ping);
	sound3.setRefDistance( 20 );
	sound3.setVolume(10);
	mesh3.add(sound3);
	spheres.push( mesh3 );

	// analysers

	analyser1 = new THREE.AudioAnalyser( sound1, 32 );
	analyser2 = new THREE.AudioAnalyser( sound2, 32 );
	analyser3 = new THREE.AudioAnalyser( sound3, 32 );

	// ground

	var helper = new THREE.GridHelper( 500, 10 );
	helper.color1.setHex( 0x444444 );
	helper.color2.setHex( 0x444444 );
	helper.position.y = 0.1;
	scene.add( helper );

	plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight, 8, 8 ),
		new THREE.MeshBasicMaterial( { visible: false } )
	);
	scene.add( plane );

	var SoundControls = function() {
		   this.master = listener.getMasterVolume();
		   this.firstSphere =  sound1.getVolume();
		   this.secondSphere =  sound2.getVolume();
		   this.thirdSphere = sound3.getVolume();
	};
	var GeneratorControls = function() {
		   this.frequency = filter.frequency.value;
	}
	var PathControls = function() {
		this.radius = radius;
		this.speed = speed;
	}
	var gui = new dat.GUI();
	var soundControls = new SoundControls();
	var generatorControls = new GeneratorControls();
	var pathControls = new PathControls();
	var volumeFolder = gui.addFolder('sound volume');
	var generatorFolder = gui.addFolder('sound generator');
	var pathFolder = gui.addFolder('path');
	volumeFolder.add(soundControls, 'master').min(0.0).max(1.0).step(0.01).onChange(function() {
		listener.setMasterVolume(soundControls.master);
	});
	volumeFolder.add(soundControls, 'firstSphere').min(0.0).max(20.0).step(0.01).onChange(function() {
		sound1.setVolume(soundControls.firstSphere);
	});
	volumeFolder.add(soundControls, 'secondSphere').min(0.0).max(20.0).step(0.01).onChange(function() {
		sound2.setVolume(soundControls.secondSphere);
	});

	volumeFolder.add(soundControls, 'thirdSphere').min(0.0).max(20.0).step(0.01).onChange(function() {
		sound3.setVolume(soundControls.thirdSphere);
	});
	volumeFolder.open();
	pathFolder.add(pathControls, 'radius').min(0.0).max(500.0).step(5).onChange(function() {
		radius = pathControls.radius;
	});
	pathFolder.add(pathControls, 'speed').min(0.0).max(20.0).step(1).onChange(function() {
		speed = pathControls.speed;
	});
	pathFolder.open();
	generatorFolder.add(generatorControls, 'frequency').min(20.0).max(20000.0).step(1.0).onChange(function() {
		filter.frequency.value = generatorControls.frequency;
	});
	// generatorFolder.open();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	// renderer.setClearColor( 0xf0f0f0 );
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	container.innerHTML = "";
	container.appendChild( renderer.domElement );
	renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
	renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = false;
	
	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	//

	raycaster.setFromCamera( mouse, camera );

	if ( SELECTED ) {

		var intersects = raycaster.intersectObject( plane );

		if ( intersects.length > 0 ) {

			SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
			if (event.shiftKey) {
				SELECTED.position.z = intersects[ 0 ].point.sub( offset ).y * 2 ;
				// controlState(false);
    		}
    		else if (event.altKey) {
    			SELECTED.position.z = -intersects[ 0 ].point.sub( offset ).y * 2 ;

    		}
		}

		return;

	}

	var intersects = raycaster.intersectObjects( spheres );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

			plane.position.copy( INTERSECTED.position );
	
			plane.lookAt( camera.position );

		}

		container.style.cursor = 'pointer';

	} else {

		if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

		container.style.cursor = 'auto';

	}

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( spheres );

	if ( intersects.length > 0 ) {

    	controlState(false);

		SELECTED = intersects[ 0 ].object;

		var intersects = raycaster.intersectObject( plane );

		if ( intersects.length > 0 ) {

			offset.copy( intersects[ 0 ].point ).sub( plane.position );

		}

		container.style.cursor = 'move';

	}
	else {
		controlState(true);
	}

}

function onDocumentMouseUp( event ) {

	event.preventDefault();

	if ( INTERSECTED ) {

		plane.position.copy( INTERSECTED.position );

		SELECTED = null;

	}

	container.style.cursor = 'auto';

}

function animate() {

	requestAnimationFrame( animate );
	// controls.update();
	render();

}


function render() {

	var delta = clock.getDelta();
	var timer = Date.now() * 0.0002;

	material_sphere1.emissive.b = analyser1.getData()[ 8 ] / 256;
	material_sphere2.emissive.b = analyser2.getData()[ 8 ] / 256;
	material_sphere3.emissive.b = analyser3.getData()[ 8 ] / 256;

	if (pathFlag == 1) {
		for ( var i = 0, il = spheres.length; i < il; i ++ ) {
			var sphere = spheres[ i ];
			sphere.position.x = radius * Math.sin( timer*speed + i );
			sphere.position.y = -radius * Math.sin( timer*speed + i );
			sphere.position.z = -radius * Math.cos( timer*speed + i );
			// camera.lookAt( sphere.position );	
		}
		// camera.position.x = Math.cos( timer*2 ) * 100;
		// camera.position.y = Math.sin( timer*4 ) * 50;
		// camera.position.z = Math.sin( timer*6 ) * 100;
		// camera.lookAt( spheres[0].position );
	}

	renderer.render( scene, camera );

}

function controlState(state) {
	// body...
	controls.enabled = state;
}