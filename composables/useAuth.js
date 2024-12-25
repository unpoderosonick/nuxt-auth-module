import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

export function useAuth() {
  // Verifica que se está ejecutando en el cliente
  if (!process.client) {
    return {
      login: () => {
        throw new Error("Auth no disponible en el servidor.");
      },
      register: () => {
        throw new Error("Auth no disponible en el servidor.");
      },
      logout: () => {
        throw new Error("Auth no disponible en el servidor.");
      },
    };
  }

  const token = useCookie("auth_token"); // Maneja la cookie del token
  const auth = getAuth(); // Inicializa Firebase Authentication

  /**
   * Inicia sesión con email y contraseña
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<object>} - Objeto del usuario autenticado
   */
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      token.value = await userCredential.user.getIdToken(); // Guarda el token en la cookie
      return userCredential.user;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      throw error;
    }
  };

  /**
   * Registra un nuevo usuario con email y contraseña
   * @param {string} email - Email del nuevo usuario
   * @param {string} password - Contraseña del nuevo usuario
   * @returns {Promise<object>} - Objeto del usuario registrado
   */
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error al registrar:", error.message);
      throw error;
    }
  };

  /**
   * Cierra la sesión del usuario actual
   * @returns {Promise<void>} - Confirma el cierre de sesión
   */
  const logout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      token.value = null; // Limpia la cookie del token
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw error;
    }
  };

  return { login, register, logout };
}
