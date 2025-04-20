import { z } from "zod";

export const CreateEventValidate = z.object({
    name: z.string({ message: "Name is required" }),
    shortDescription: z.string({ message: "Short description is required" }),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }),
    type: z.number({ message: "Type ID is required" }),
    status: z.number({ message: "Status ID is required" }),
    mode: z.number({ message: "Mode ID is required" }), 
    categoryId: z.number({ message: "Category ID is required" }),
    description: z.string({ message: "Description is required" }),
    location: z.string({ message: "Location is required" }),
    address: z.string({ message: "Address is required" }),
    meetLink: z.string().nullable(),
    coverPhoto: z.string({ message: "Cover photo is required" }),
  });
