import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) return; // Evita que Firebase se inicialice en el servidor

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
    measurementId: config.public.firebase.measurementId,
  };

  const app = initializeApp(firebaseConfig);

  if (process.client) {
    getAnalytics(app); // Analytics solo se inicializa en el cliente
  }

  return {
    provide: {
      firebase: app,
    },
  };
});
