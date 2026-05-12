import AppModule from "@/app/module";

async function bootstrap() {
  const app = await AppModule();
  await app.listen();
}

bootstrap();
