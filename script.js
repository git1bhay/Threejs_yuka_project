import * as THREE from 'three';

class ThreeSetup{
    constructor(){
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.objects = [];


        this._handleWindowResize();
        window.addEventListener('resize',()=>this._handleWindowResize());

    }

    basiclight(){
        this.light = new THREE.AmbientLight(0xffffff,1)
        this.scene.add(this.light)
    }
    removeObject(object) {
        this.scene.remove(object);
        const index = this.objects.indexOf(object);
        if (index > -1) {
          this.objects.splice(index, 1);
        }
      }

    addObject(object) {
        this.scene.add(object);
        this.objects.push(object);
      }

    _handleWindowResize(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth/ window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    cameraz(a=5){
        this.camera.position.z = a;
    }

    render(){
        this.renderer.render(this.scene,this.camera)
    }


    animate(){
        requestAnimationFrame(()=> this.animate());


        this.render();
    }

    


}

export default ThreeSetup;