import z from "zod";

export const createTemplateSchema = z.object({
    key: z.string().min(1, "Key is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.string().min(1, "Type is required"),
    category: z.string().min(1, "Category is required"),
    promptHint: z.string().optional(),
    isActive: z.boolean().optional(),
});

export const updateTemplateSchema = z.object({
    key: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    promptHint: z.string().optional(),
    isActive: z.boolean().optional(),
});


export type ITemplateCreatePayload = z.infer<typeof createTemplateSchema>;
export type ITemplateUpdatePayload = z.infer<typeof updateTemplateSchema>;