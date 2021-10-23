import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ArticleModule } from './module/article/article.module';
import { CategoryModule } from './module/category/category.module';
import { UploadModule } from './module/upload/upload.module';
import { TagModule } from './module/tag/tag.module';
import { DiaryModule } from './module/diary/diary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '271019',
      database: 'myblog',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    CategoryModule,
    UploadModule,
    TagModule,
    DiaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
