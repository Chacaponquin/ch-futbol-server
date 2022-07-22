import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "./src/graphql/index.js";
import fileUpload from "express-fileupload";
import User from "./src/db/schemas/User.js";
import rootRoutes from "./src/routes/routes.js";

import "./src/db/mongo.js";
import "./src/config/cloudinary.js";

async function startApolloServer(typeDefs, resolvers) {
  dotenv.config();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./upload",
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );
  app.use("/", rootRoutes);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({ title: "Perfect Api" }),
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;

      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const token = auth.substring(7);

        try {
          if (token) {
            const user = jwt.verify(token, process.env.SECRET_WORD);

            const currentUser = await User.findById(user.id);
            return { currentUser };
          } else return { currentUser: null };
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError)
            throw new HttpQueryError(401, "El token ha expirado");
          else return { currentUser: null };
        }
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 5000;
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
