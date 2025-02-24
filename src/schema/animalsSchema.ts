import { z } from "zod";

const animalsSchema = z.array(z.object({
    id: z.number().gte(1).int(),
    species: z.string(),
    color: z.string(),
    breed: z.string(),
    gender: z.string(),
    pictureUrl: z.string().toLowerCase(),
}))

export default animalsSchema;
