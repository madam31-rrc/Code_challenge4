import admin from "firebase-admin";

let app: admin.app.App;

if (!admin.apps.length) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    
    app = admin.initializeApp();
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process
          .env
          .FIREBASE_PRIVATE_KEY!
          .replace(/\\n/g, "\n"),
      }),
    });
  } else {
    throw new Error(
      "Firebase Admin not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_* envs."
    );
  }
} else {
  app = admin.app();
}

export const auth = admin.auth(app);
