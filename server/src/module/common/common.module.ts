import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Article from 'src/entity/article.entity';
import Diary from 'src/entity/diary.entity';
import { ArticleService } from '../article/article.service';
import { DiaryService } from '../diary/diary.service';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Diary])],
  controllers: [CommonController],
  providers: [CommonService, ArticleService, DiaryService]
})
export class CommonModule {}
