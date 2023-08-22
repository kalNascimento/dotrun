import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../common/config/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const login = async (auth: any, email: any, password: any) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async (data: { auth: any; email: any; password: any }) => {
      await login(data.auth, data.email, data.password);
    },
    {
      onMutate: async (variables) => {

      },
      onSuccess: (result, variables, context) => {

      },
      onError: (error, variables, context) => {

      },
    }
  );

  return { loginMutation };
};