import { z } from "zod";

export const OrganizerRegisterValidate = z.object({
  name: z.string(),
  about: z.string(),
  address: z.string(),
  logo: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  x: z.string().optional(),
});
