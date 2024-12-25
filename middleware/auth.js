export default defineNuxtRouteMiddleware((to, from) => {
  if (!process.client) return; // Middleware no se ejecuta en el servidor

  const token = useCookie("auth_token");

  if (!token.value) {
    return navigateTo("/login"); // Redirige al login si no hay token
  }
});
