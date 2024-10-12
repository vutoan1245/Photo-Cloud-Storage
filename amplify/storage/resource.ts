import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "photoStorage",
  access: (allow) => ({
    "photos/{entity_id}/*": [
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
