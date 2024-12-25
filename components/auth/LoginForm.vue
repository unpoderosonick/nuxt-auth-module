<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium">Email:</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        class="w-full px-4 py-2 border rounded"
        required
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium">Contraseña:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="w-full px-4 py-2 border rounded"
        required
      />
    </div>
    <button
      type="submit"
      class="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
      :disabled="loading"
    >
      {{ loading ? "Cargando..." : "Iniciar sesión" }}
    </button>
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    <p v-if="success" class="mt-2 text-sm text-green-600">¡Inicio de sesión exitoso!</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const success = ref(false); // Agregamos la propiedad 'success'
const loading = ref(false);

const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;

  try {
    await login(email.value, password.value);
    success.value = true; // Establece 'success' como true en caso de éxito
    router.push("/home"); // Redirige a la página de inicio después del login
  } catch (err) {
    error.value = "Error al iniciar sesión: " + (err.message || "Inténtalo de nuevo.");
    console.error("Error en el inicio de sesión:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
