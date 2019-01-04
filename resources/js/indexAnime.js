var TopAnimation = (function(ta) {
  ta = (function() {

    var container, stats;
    var camera, scene, renderer;

    function start() {
      init();
      animate();
    }

    function init() {
      container = document.getElementById( 'container' );
      camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10 );
      camera.position.z = 2;
      camera.fov = 90;
      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );
      // geometry
      var vector = new THREE.Vector4();
      var instances = 4000;
      var positions = [];
      var offsets = [];
      var colors = [];
      var orientationsStart = [];
      var orientationsEnd = [];
      // 三角形の場合
      // positions.push( 0.025, - 0.025, 0 );
      // positions.push( - 0.025, 0.025, 0 );
      // positions.push( 0, 0, 0.025 );

      // 四角形の場合
      positions.push(-0.02,-0.02, 0.02);
      positions.push( 0.02,-0.02, 0.02);
      positions.push( 0.02, 0.02, 0.02);
      positions.push(-0.02, 0.02, 0.02);

      // 頂点インデックスを生成
      // ポリゴンは基本的には三角形
      // そのため、indeを定義する必要あり
      // 参考：https://wgld.org/d/webgl/w018.html
      var indices = new Uint16Array([
          0, 1, 2,
          2, 3, 0
      ]);
      // instanced attributes
      for ( var i = 0; i < instances; i ++ ) {
        // offsets
        offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
        // colors
        // colors.push( Math.random(), Math.random(), Math.random(), Math.random() );
        // colors.push( 0.2, 0.8, 0.2, 0.6 );
        colors.push( Math.random(), Math.random() * 2, Math.random(), 0.6 );
        // console.log(colors);
        // orientation start
        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();
        orientationsStart.push( vector.x, vector.y, vector.z, vector.w );
        // orientation end
        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();
        orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
      }
      var geometry = new THREE.InstancedBufferGeometry();
      geometry.maxInstancedCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise
      geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
      geometry.addAttribute( 'index', new THREE.BufferAttribute(indices,  1) );
      // geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
      geometry.addAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
      geometry.addAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
      geometry.addAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
      geometry.addAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );


      // material
        // uniforms: {
        //   time: { value: 1.0 },
        //   sineTime: { value: 1.0 }
        // },
      var material = new THREE.RawShaderMaterial( {
        uniforms: {
          time: { value: 1.0 },
          sineTime: { value: 1.0 }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        side: THREE.DoubleSide,
        transparent: true
      } );
      //
      var mesh = new THREE.Mesh( geometry, material );
      // mesh.position.set(5, 5, 5);
      // console.log(mesh);
      scene.add( mesh );
      //
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      // renderer.setClearColor( 0xffffff, 1 );
      container.appendChild( renderer.domElement );
      if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === null ) {
        document.getElementById( 'notSupported' ).style.display = '';
        return;
      }
      //
      // var gui = new dat.GUI( { width: 350 } );
      // gui.add( geometry, 'maxInstancedCount', 0, instances );
      //
      // stats = new Stats();
      // container.appendChild( stats.dom );
      //
      window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    //
    function animate() {
      requestAnimationFrame( animate );
      render();
      // stats.update();
    }
    function render() {
      // var time = performance.now();
      // 白画面描画時まで時間をずらす
      var time = performance.now() - 7300; // 6300;
      // console.log(time);
      var object = scene.children[ 0 ];
      object.rotation.y = time * 0.00015; // 0.0001 回転の速さ
      object.material.uniforms.time.value = time * 0.005; // 0.005 形状変化の動きの速さ
      object.material.uniforms.sineTime.value = Math.sin( object.material.uniforms.time.value * 0.05 ); // 0.05 
      // console.log(Math.sin( object.material.uniforms.time.value * 0.05 ));
      renderer.render( scene, camera );
    }

    start();

  });

  return ta;
})(TopAnimation || {});