import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Login, LoginResponse } from "@/types/types";



export const useLogin = () =>
  useMutation<LoginResponse, Error, Login>({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
  });