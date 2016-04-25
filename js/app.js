if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, controls, scene, renderer;
var light, pointLight;

var spheres = [];
// var mouseX = 0, mouseY = 0;
// var windowHalfX = 400 / 2;
// var windowHalfY = 400 / 2;
var mesh;
var material_sphere1, material_sphere2;

var analyser1, analyser2, analyser3;
var pathFlag = 0;
var spherePos, sphereZ;

var clock = new THREE.Clock();
// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
init();
animate();

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 50, 400 / 400, 1, 10000 );
	camera.position.set( 50, 25, 200 );

	listener = new THREE.AudioListener();
	Tone.setContext(listener.context);
	camera.add( listener );


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
	var synth1 = new Tone.AMSynth();
	// synth1.triggerAttackRelease("E2", "20");
	// sound1.load( 'sounds/ambience.mp3' );
	sound1.setNodeSource(synth1);
	sound1.setRefDistance( 20 );
	sound1.setVolume(0.5);
	// sound1.autoplay = true;
	// sound1.setLoop(5);
	mesh1.add( sound1 );
	spheres.push( mesh1 );

	//

	var mesh2 = new THREE.Mesh( sphere, material_sphere2 );
	mesh2.position.set( 0, 30, 30 );
	scene.add( mesh2 );

	var sound2 = new THREE.PositionalAudio( listener );
	var synth2 = new Tone.FMSynth();
	// synth2.triggerAttackRelease("D2", "20");
	// sound2.load( 'sounds/piano.mp3' );
	sound2.setNodeSource(synth2);
	sound2.setRefDistance( 20 );
	sound2.setVolume(0.5);
	// sound2.autoplay = true;
	// sound2.setLoop(5);
	mesh2.add( sound2 );
	spheres.push( mesh2 );

	//


	var mesh3 = new THREE.Mesh( sphere, material_sphere3 );
	mesh3.position.set( 30, 30, 30 );
	scene.add( mesh3 );

	var sound3 = new THREE.PositionalAudio( listener );
	// var oscillator = listener.context.createOscillator();
	// oscillator.type = 'sine';
	// oscillator.frequency.value = 105;




			var ping = new Tone.PingPongDelay(.16, 0.2);

			var filter = new Tone.Filter(700, "lowpass").connect(ping);

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

				matrix1.col = 15
				matrix1.row = 10
				matrix1.init()

				setInterval(matrix1.life,80)

				matrix1.on('*',function(data) {
					// synth.set("detune",~~(Math.random()*10-5))
					if (data.grid) {
						for (var i=0;i<data.grid.length;i++) {
							for (var j=0;j<data.grid[i].length;j++) {
								if (data.grid[i][j]) {
									synth.triggerAttackRelease((j+1)*(i+1)*5, .12);
									synth1.triggerAttackRelease((j+1)*(i+1)*2, .12);
									synth2.triggerAttackRelease((j+1)*(i+1)*3, .12);
								}
							}
						}
					}
				})

				position1.on('*',function(data) {
					// console.log(data.x);
					spherePos = data;
					// console.log(spherePos[]);
					spheres[0].position.x = data.x * 100;
					spheres[0].position.y = data.y * 100;
					spheres[1].position.x = data.x * 80;
					spheres[1].position.y = data.y * 80;
					spheres[2].position.x = data.x * 50;
					spheres[2].position.y = data.y * 50;
					// if (data.amp) {
					// 	console.log(data.amp);
					// 	filter.frequency.value = data.amp * 2000
					// }
				});
				slider1.on('*',function(data) {
					// console.log(data.value);
					sphereZ = data;
					spheres[0].position.z = data.value * 500;
					spheres[1].position.z = data.value * 300;
					spheres[2].position.z = data.value * 750;
				});
				toggle1.on('*', function(data) {
					// console.log(data);
					pathFlag = data.value;
				});

				// position1.val.points = [
				// 	{ x: 0.1, y: 0.8 },
				// 	{ x: 0.4, y: 0.3 },
				// 	{ x: 0.7, y: 0.6 },
				// 	{ x: 0.9, y: 0.8 }
				// ]
				// position1.draw()
				// position1.looping = true;
				// position1.duration = 15000;
				// position1.start()


			}














	// var synth3 = new Tone.DuoSynth();
	// synth3.triggerAttackRelease("C5", "20");

	// oscillator.start(0);
	sound3.setNodeSource(ping);
	sound3.setRefDistance( 20 );
	sound3.setVolume(10);
	mesh3.add(sound3);
	spheres.push( mesh3 );

	// analysers

	analyser1 = new THREE.AudioAnalyser( sound1, 32 );
	analyser2 = new THREE.AudioAnalyser( sound2, 32 );
	analyser3 = new THREE.AudioAnalyser( sound3, 32 );

	// global ambient audio

	// var sound4 = new THREE.Audio( listener );
	// sound4.load( 'sounds/Project_Utopia.ogg' );
	// sound4.autoplay = true;
	// sound4.setLoop(true);
	// sound4.setVolume(0.5);

	// ground

	var helper = new THREE.GridHelper( 500, 10 );
	helper.color1.setHex( 0x444444 );
	helper.color2.setHex( 0x444444 );
	helper.position.y = 0.1;
	scene.add( helper );

	//
	// var SoundControls = function() {
	// 	   this.master = listener.getMasterVolume();
	// 	   this.firstSphere =  sound1.getVolume();
	// 	   this.secondSphere =  sound2.getVolume();
	// 	   this.thirdSphere = sound3.getVolume();
	// 	   // this.Ambient =  sound4.getVolume();
	// };
	// var GeneratorControls = function() {
	// 	   this.frequency = oscillator.frequency.value;
	// 	   this.wavetype = oscillator.type;
	// }
		// var gui = new dat.GUI();
	// var soundControls = new SoundControls();
	// var generatorControls = new GeneratorControls();
	// var volumeFolder = gui.addFolder('sound volume');
	// var generatorFolder = gui.addFolder('sound generator');
	// volumeFolder.add(soundControls, 'master').min(0.0).max(1.0).step(0.01).onChange(function() {
	// 	listener.setMasterVolume(soundControls.master);
	// });
	// volumeFolder.add(soundControls, 'firstSphere').min(0.0).max(1.0).step(0.01).onChange(function() {
	// 	sound1.setVolume(soundControls.firstSphere);
	// });
	// volumeFolder.add(soundControls, 'secondSphere').min(0.0).max(1.0).step(0.01).onChange(function() {
	// 	sound2.setVolume(soundControls.secondSphere);
	// });

	// volumeFolder.add(soundControls, 'thirdSphere').min(0.0).max(1.0).step(0.01).onChange(function() {
	// 	sound3.setVolume(soundControls.thirdSphere);
	// });
	// volumeFolder.add(soundControls, 'Ambient').min(0.0).max(1.0).step(0.01).onChange(function() {
	// 	sound4.setVolume(soundControls.Ambient);
	// });
	// volumeFolder.open();
	// generatorFolder.add(generatorControls, 'frequency').min(50.0).max(5000.0).step(1.0).onChange(function() {
	// 	oscillator.frequency.value = generatorControls.frequency;
	// });
	// generatorFolder.add(generatorControls, 'wavetype', ['sine', 'square', 'sawtooth', 'triangle']).onChange(function() {
	// 	oscillator.type = generatorControls.wavetype;
	// });
	// generatorFolder.open();




	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 400, 400 );
	container.innerHTML = "";
	container.appendChild( renderer.domElement );
	effect = new THREE.StereoEffect( renderer );
	effect.setSize( 400, 400 );

	//
	// controls = new THREE.FirstPersonControls( camera, renderer.domElement );

	// Our preferred controls via DeviceOrientation
    function setOrientationControls(e) {
      if (!e.alpha) {
        return;
      }

      controls = new THREE.DeviceOrientationControls(camera, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
    window.addEventListener('deviceorientation', setOrientationControls, true);


	// controls.movementSpeed = 70;
	// controls.lookSpeed = 0.05;
	// controls.noFly = true;
	// controls.lookVertical = false;



	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = 400 / 400;
	camera.updateProjectionMatrix();

	renderer.setSize( 400, 400 );

	// controls.handleResize();

}

// function onDocumentMouseMove( event ) {
// 	mouseX = ( event.clientX - windowHalfX ) * 10;
// 	mouseY = ( event.clientY - windowHalfY ) * 10;
// }

function animate() {

	requestAnimationFrame( animate );
	// controls.update();
	render();

}


function render() {

	var delta = clock.getDelta();
	var timer = Date.now() * 0.0002;

	// camera.position.x += ( mouseX - camera.position.x ) * .05;
	// camera.position.y += ( - mouseY - camera.position.y ) * .05;
	// camera.lookAt( scene.position );


	// controls.update( delta );

	material_sphere1.emissive.b = analyser1.getData()[ 8 ] / 256;
	material_sphere2.emissive.b = analyser2.getData()[ 8 ] / 256;
	material_sphere3.emissive.b = analyser3.getData()[ 8 ] / 256;

	// camera.position.x = Math.cos( timer*2 ) * 100;
	// camera.position.y = Math.sin( timer ) * 50;
	// camera.position.z = Math.sin( timer*2 ) * 100;
	camera.lookAt( scene );
	if (pathFlag == 1) {
		for ( var i = 0, il = spheres.length; i < il; i ++ ) {
		var sphere = spheres[ i ];
		sphere.position.x = spherePos.x * 100 * Math.sin( timer*2 + i );
		sphere.position.y = spherePos.y * 100 * Math.sin( timer*2 + i );
		sphere.position.z = sphereZ.value * 200 * Math.cos( timer*2 + i );
	}
	}

	renderer.render( scene, camera );
	// effect.render(scene, camera);

}
