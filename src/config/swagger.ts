import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "InotaVault API",
      version: "1.0.0",
      description: "API documentation for InotaVault platform",
    },
    servers: [
      {
        url: "http://localhost:5500",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["src/routes/*.ts", "src/controllers/*.ts"], // where docs live
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
