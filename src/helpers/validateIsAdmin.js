import { HttpQueryError } from "apollo-server-core";

export const validateIsAdmin = (user) => {
  if (user) {
    if (!user.isAdmin)
      throw new HttpQueryError(
        401,
        "Se necesita ser administrador para realizar esta tarea"
      );
  } else
    throw new HttpQueryError(
      401,
      "Se necesita tener un usuario para poder realizar esta tarea"
    );
};
