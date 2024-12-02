import { z } from "zod";

export const UserRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  
});
