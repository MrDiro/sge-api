import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const swagger = (app: NestExpressApplication) => {

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("SGE-API")
    .setDescription("API Documnetation")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
};

export { swagger };