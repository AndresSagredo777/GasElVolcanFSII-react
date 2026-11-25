const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

async function enviarAuth(ruta, datos) {
  const respuesta = await fetch(`${AUTH_URL}${ruta}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  const resultado = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(resultado.error || `Error HTTP ${respuesta.status}`);
  }

  return resultado;
}

export function iniciarSesionAPI(email, password) {
  return enviarAuth('/auth/login', { correo: email, password });
}

export function registrarUsuarioAPI(usuario) {
  return enviarAuth('/auth/registro', {
    nombre: usuario.nombre,
    correo: usuario.email,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
    password: usuario.password,
  });
}
