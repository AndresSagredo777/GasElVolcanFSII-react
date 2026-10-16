const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexFono = /^(\+?56)?9\d{8}$/;

export function esEmailValido(email) {
  return regexMail.test(email);
}

export function esTelefonoValido(telefono) {
  return regexFono.test(telefono.replace(/\s+/g, ""));
}

export function validarLogin(formulario) {
  if (!formulario.email || !formulario.password) {
    return "Por favor ingresa tu correo y contraseña.";
  }
  return "";
}

export function validarRegistro(formulario) {
  if (!formulario.nombre.trim() || formulario.nombre.length < 3) {
    return "Ingresa tu nombre completo.";
  }
  if (!esEmailValido(formulario.email)) {
    return "Ingresa un correo electrónico válido.";
  }
  if (formulario.password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (formulario.password !== formulario.confirmarPassword) {
    return "Las contraseñas no coinciden.";
  }
  return "";
}

export function validarEnvio(datos) {
  const errores = {};

  if (datos.nombre.trim().length < 3) {
    errores.nombre = "Ingresa un nombre completo válido.";
  }
  if (datos.direccion.trim().length < 5) {
    errores.direccion = "Ingresa una dirección con número.";
  }
  if (!datos.comuna.trim()) {
    errores.comuna = "Ingresa tu comuna.";
  }
  if (!esTelefonoValido(datos.telefono)) {
    errores.telefono = "Teléfono inválido (ej: 912345678).";
  }
  return errores;
}

export function formularioValido(errores) {
  return Object.keys(errores).length === 0;
}