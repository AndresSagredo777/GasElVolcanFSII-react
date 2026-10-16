function mismoEmail(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

export function crearUsuario(formulario) {
  return {
    nombre: formulario.nombre,
    email: formulario.email,
    telefono: formulario.telefono,
    direccion: formulario.direccion,
    password: formulario.password,
  };
}

export function registrarNuevoUsuario(usuarios, nuevoUsuario) {
  const existe = usuarios.some((u) => mismoEmail(u.email, nuevoUsuario.email));

  if (existe) {
    return { exito: false, mensaje: "El correo ya se encuentra registrado.", usuarios };
  }
  return { exito: true, mensaje: "", usuarios: [...usuarios, nuevoUsuario] };
}

export function buscarUsuario(usuarios, email, password) {
  return usuarios.find((u) => mismoEmail(u.email, email) && u.password === password);
}

export function obtenerPrimerNombre(usuario) {
  return usuario.nombre.split(" ")[0];
}