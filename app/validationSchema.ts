import z from "zod";

export const issueSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(255),
  description: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1)
    .max(255)
    .optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
