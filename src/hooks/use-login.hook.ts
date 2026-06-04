import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const loginMutation = useMutation(
    async (data: { auth: any; email: string; password: string }) => {
      await signInWithEmailAndPassword(data.auth, data.email, data.password);
    }
  );

  return { loginMutation };
};
