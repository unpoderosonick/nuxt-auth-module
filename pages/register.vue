<template>
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Crear Cuenta</h1>
      <form @submit.prevent="handleRegister" class="space-y-4">
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
          class="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuth } from "~/composables/useAuth";
  
  const email = ref("");
  const password = ref("");
  const error = ref("");
  
  const { register } = useAuth();
  
  const handleRegister = async () => {
    error.value = "";
  
    try {
      await register(email.value, password.value);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (err) {
      error.value = "Error al registrar: " + (err.message || "Inténtalo de nuevo.");
    }
  };
  definePageMeta({
    middleware: "auth",
  });
  
  const handleLogin = () => {
    // Lógica de login
  };
  
  </script>
  
  <style scoped>
  div {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }
  </style>
  
