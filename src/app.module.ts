import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivaliersModule } from './festivaliers/festivaliers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'festival',
    }),
    EventsModule,
    FestivaliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
