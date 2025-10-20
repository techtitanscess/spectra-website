import { openAPI } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean",
        required: true,
        default: false,
      },
    },
  },
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
