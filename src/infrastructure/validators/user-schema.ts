import { z } from "zod";

export const UserRegisterValidate = z.object({
  firstName: z
    .string()
    .min(3, { message: "Must be 3 or fewer characters long" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "must be a email" }),
  phone: z.number({ message: "Invalid phone number" }),
  profile: z.string().optional(),
  password: z.string({ message: "invalid password" }),
});
