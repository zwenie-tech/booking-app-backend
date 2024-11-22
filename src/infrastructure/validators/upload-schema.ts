import { z } from "zod";
import { config } from "../../shared/utils/constants/app-constants";

const validMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ImageFileValidate = z.object({
  type: z.enum(validMimeTypes, {
    invalid_type_error:
      "Invalid file type. Only jpeg, jpg, png, and webp are allowed.",
  }),
  size: z.number().max(config.maxUploadFileSize, {
    message: "File size must be less than or equal to 5 MB.",
  }),
});
