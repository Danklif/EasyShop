const images = document.querySelectorAll('img');
let loadedCount = 0;

if (images.length <= 1) {
    hideLoader();
}

function handleImageLoad() {
  loadedCount++;
  console.log("Cargando")
  if (loadedCount === images.length - 1) {
    hideLoader();
  }
}

images.forEach((image) => {
    image.addEventListener('load', handleImageLoad);
});

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hide');
}
  
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (!loader.classList.contains("hide")) {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            text: 'La carga de la página está tardando demasiado.',
            showConfirmButton: false,
            timer: 4000,
            toast: true,
        })
        hideLoader()
    }
}, 5000);