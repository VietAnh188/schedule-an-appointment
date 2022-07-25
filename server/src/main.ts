import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/apps/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'debug', 'verbose', 'warn']
    });
    await app.listen(1808);
}
bootstrap();
