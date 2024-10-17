import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

class SwaggerSetup {
  private options?: swaggerJSDoc.Options;
  private swaggerSpec?: object;

  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.options = {
        definition: {
          author: "binshadcs",
          info: {
            title: "Booking app API",
            version: "1.0.0",
          },
        },
        apis: ["./routes/*.ts"],
      };

      this.swaggerSpec = swaggerJSDoc(this.options);
    }
  }

  setup(app: Express): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
  }
}

export const swaggerSetup = new SwaggerSetup();
