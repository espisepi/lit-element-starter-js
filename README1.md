puedo escribir código css en el html en donde añada este web component y que ese codigo css afecte a mi web component?

El Shadow DOM, que es utilizado por los Web Components para encapsular su estructura interna (incluido el CSS), por defecto impide que los estilos definidos fuera del componente (como en el documento HTML principal o en otros componentes) afecten directamente al contenido del Shadow DOM del componente. Esta característica está diseñada para permitir que los componentes web sean reutilizables y estilísticamente independientes, evitando conflictos de estilos y sobrescrituras no deseadas.

Sin embargo, hay varias formas en las que puedes permitir que los estilos definidos externamente afecten a un Web Component:

1. **Variables CSS y propiedades personalizadas**: Lit y otros Web Components pueden exponer partes de su estilo a través de variables CSS, que pueden ser modificadas desde fuera del Shadow DOM. Esto permite cierto grado de personalización de estilos de manera controlada.

   Dentro del Web Component, podrías definir estilos que dependen de variables CSS:

   ```css
   .carousel-item {
     background-color: var(--carousel-bg-color, #fff); /* Valor por defecto #fff */
   }
   ```

   Y luego, en tu documento HTML o CSS global, puedes establecer el valor de esa variable:

   ```css
   simple-carousel {
     --carousel-bg-color: #000; /* Cambia el fondo a negro */
   }
   ```

2. **Usar `::part` y `::theme` (CSS Shadow Parts)**: Lit y otros componentes que utilizan Shadow DOM pueden exponer partes de su estructura interna para ser estilizadas desde fuera utilizando la pseudo-elemento `::part`. Debes modificar el componente para que marque explícitamente las partes que quieres exponer:

   Dentro de tu componente:
   ```javascript
   render() {
     return html`
       <div class="carousel-container" part="container">
         <!-- contenido -->
       </div>
     `;
   }
   ```

   Y en tu CSS global, puedes apuntar a esa parte:
   ```css
   simple-carousel::part(container) {
     /* estilos */
   }
   ```

3. **Inyección de estilos**: Algunos frameworks y librerías permiten inyectar estilos directamente en el Shadow DOM de un componente. Esto suele hacerse mediante la programación en JavaScript y no es una práctica común debido a que rompe la encapsulación que ofrece el Shadow DOM.

4. **Slots**: Aunque no es una técnica directa para aplicar estilos externos, los slots permiten insertar contenido desde el documento HTML en el Web Component, incluidos elementos con sus propios estilos. Sin embargo, esto no aplica estilos directamente a los elementos internos del componente, sino que permite que contenido externo estilizado se muestre dentro del componente.

En resumen, aunque los estilos globales no afectan directamente al contenido dentro del Shadow DOM de un Web Component, las variables CSS, `::part`, y otras técnicas proporcionan métodos para personalizar la apariencia de estos componentes de forma controlada. Estos métodos requieren que tanto el desarrollador del componente como el consumidor colaboren para permitir y utilizar la personalización de estilos.