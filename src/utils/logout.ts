import { signOut } from "firebase/auth";

import { auth } from "@configs/firebase";

// Ao sair, o AppRoute detecta a mudança de autenticação e volta para o Login.
export const logout = () => signOut(auth);
