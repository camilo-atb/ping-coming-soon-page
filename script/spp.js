document.getElementById('inscripcionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const parrafoError = document.querySelector(".validacion_correo");
  const inputEmail = document.getElementById('form_email');
  const email = inputEmail.value.trim().toLowerCase().replace(/[^\x20-\x7E]/g, "");
  const API_URL = `${window.location.origin}/inscripcion`;
  const mensaje = document.getElementById('mensaje');
  const boton = document.querySelector('.form_button');
  boton.disabled = true;
  boton.textContent = 'Enviando...';

  if (email === "" || !validarCorreo(email)) {
    inputEmail.classList.add("validacion_correo--error");
    parrafoError.classList.add("validacion_correo--active");
    document.getElementById('mensaje').textContent = "";

    boton.disabled = false;
    boton.textContent = 'Notify Me';
    return;
  } else {
    inputEmail.classList.remove("validacion_correo--error");
    parrafoError.classList.remove("validacion_correo--active");

  fetch(API_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: email })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.text();
  })
  .then(() => {
    mensaje.textContent = "✅ Formulario enviado con éxito";
    mensaje.classList.remove('ocultar');
    document.getElementById('inscripcionForm').reset();
  })
  .catch(error => {
    mensaje.textContent = "❌ Ocurrió un error";
    mensaje.classList.remove('ocultar');
    console.error(error);
  }).finally(() => {

    setTimeout(() => {
      boton.disabled = false;
      boton.textContent = 'Notify Me';
      mensaje.classList.add('ocultar');
    }, 3000);
  });
  }

  function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }
});