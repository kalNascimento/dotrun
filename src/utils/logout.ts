import { auth } from "@configs/firebase";

export const logout = () => {
  auth.signOut();
}
