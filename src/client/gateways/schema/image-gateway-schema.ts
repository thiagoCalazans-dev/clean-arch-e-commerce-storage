import schema from "@/client/lib/schema";

export const CreateImageSchema = schema.object({
  name: schema.string().min(3),
  url: schema.string(),
});

export type CreateImage = schema.infer<typeof CreateImageSchema>;

export type PostImageParams = {
  data: CreateImage;
};
