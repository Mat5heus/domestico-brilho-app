import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";


export default defineNuxtPlugin((nuxtApp) => {
  
  const vuefireHash = useRuntimeConfig().public.vuefire.config

  const firebaseConfig = {
    apiKey: vuefireHash.apiKey,
    authDomain: vuefireHash.authDomain,
    projectId: vuefireHash.projectId,
    storageBucket: vuefireHash.storageBucket,
    messagingSenderId: vuefireHash.messagingSenderId,
    appId: vuefireHash.appId,
    measurementId: vuefireHash.measurementId,
  }

  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig)
  const analytics: Analytics = getAnalytics(app)
  const firestore: Firestore = getFirestore(app)
  
  // Add Firebase app and analytics to the Nuxt app context
  nuxtApp.provide('firebase', app)
  nuxtApp.provide('analytics', analytics)
  nuxtApp.provide('firestore', firestore)

  nuxtApp.vueApp.provide('firestore', firestore)

})