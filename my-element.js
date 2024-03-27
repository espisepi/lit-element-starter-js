/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      canvas {
      width: 100%;
      height: 100%;
    }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      count: {type: Number},

       /**
       * The images array
       * @type {Array}
       */
      items: {type: Array},
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
    this.items = [];
  }

    /**
   * Initializes the renderer and starts the animation loop.
   *
   * One-time call, which happens after the Shadow DOM was first
   * rendered by Lit-Element. Ensures the ‹canvas› element is available.
   */
    firstUpdated() {
      console.log( "three-app › firstUpdated()");
  
      // Initializes the WebGL renderer and links it to our ‹canvas› element
      // this.init();
  
      // Start the animation loop and timer
      // this.start();

      const canvas = this.renderRoot.querySelector('canvas');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Fondo negro
    
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    const controls = new OrbitControls(camera, renderer.domElement); // Inicializa OrbitControls
    // Habilitar amortiguación (suavidad) y configurar el factor de amortiguación
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    const ambientLight = new THREE.AmbientLight(0xffffff); // Luz ambiental blanca
    scene.add(ambientLight);
    
    const geometry = new THREE.BoxGeometry();
    const material = this.items.map((item) => new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(item.src), side: THREE.DoubleSide }));
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    controls.update(); // Para que OrbitControls actualice su posición inicial

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Habilita la actualización de la posición de la cámara con los controles
      renderer.render(scene, camera);
    };

    animate();
    }

  render() {
    return html`
      <h1>HOLA THREEJS</h1>
      <canvas></canvas>
    `;
  }

  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name {string} The name to say "Hello" to
   * @returns {string} A greeting directed at `name`
   */
  sayHello(name) {
    return `Hello, ${name}`;
  }
}

window.customElements.define('my-element', MyElement);
