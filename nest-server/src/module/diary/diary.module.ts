import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Diary from 'src/entity/diary.entity';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiaryController],
  providers: [DiaryService]
})
export class DiaryModule {}
