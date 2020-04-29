import { validateSchema } from "@/utils/schema";

export default function (ctx, inject) {
  inject("validateSchema", validateSchema);
}
