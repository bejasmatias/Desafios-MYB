// Esperar a que la página se cargue completamente
window.addEventListener('load', function() {
    // que cargue la pagina completa, antes de mostrar title
    var loaderContainer = document.getElementById('loader-container');
    var title = document.getElementById('title');

    // Retrasar la aparición del texto después de 4 segundos (4000 milisegundos)
    setTimeout(function() {
        // Ocultar el GIF de carga
        loaderContainer.style.display = 'none';

        // Mostrar el texto "Hello World" con animación
        title.style.opacity = '1';
        title.classList.add('animate-fade-in');
    }, 4000);
});
