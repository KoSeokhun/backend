import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Config from './common/config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config.PG_HOST,
      port: Config.PG_PORT,
      username: Config.PG_USER,
      password: Config.PG_PASSWORD,
      database: Config.PG_DATABASE,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './raw',
      }),
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
