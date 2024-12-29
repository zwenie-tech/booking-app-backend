import { z } from "zod";

export const LoginValidate = z.object({
  username: z.string({ message: "username required" }),
  password: z.string({ message: "invalid password" }),
});

export const RefreshTokenValidate = z.object({
  refreshToken: z.string({ message: "Invalid refresh token" }),
});
