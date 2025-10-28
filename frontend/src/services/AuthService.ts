import api from "../config/axios";

export const AuthService = {
// Iniciar sesion
    async login(email:string, password:string) {
    return api.post("/auth/login", { email, password });
  },

// Cerrar session
  async logout() {
    return api.post("/auth/logout");
  },

// Check de usuario logueado
  async check() {
    return api.get("/auth/check");
  },
// registrar Usuarios
  async register(nombre:string, email:string, password:string, rol = "usuario") {
    return api.post("/auth/register", { nombre, email, password, rol });
  },

// Obtener lista de usuarios
  async listarUsuarios() {
    return api.get("/auth/listar");
  },

  // Obtener usuario por ID
  async obtenerUsuarioPorId(id: number) {
    return api.get(`/auth/ver/${id}`);
  },
  //  Editar usuario por ID
  async editarUsuario(id: number, data: { nombre: string; email: string; rol: string; activo: number }) {
    return api.put(`/auth/editar/${id}`, data);
  },

  //  Cambiar contraseña por ID
  async cambiarPassword(id: number, nuevaPassword: string) {
    return api.put(`/auth/${id}/password`, { nuevaPassword });
  },

  //  Eliminar usuario por ID
  async eliminarUsuario(id: number) {
    return api.delete(`/auth/${id}`);
  }

};

