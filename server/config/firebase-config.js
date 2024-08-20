import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


const app = initializeApp();

const auth = getAuth(app);
export default auth;