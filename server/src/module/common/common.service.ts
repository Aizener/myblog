import { Injectable } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { DiaryService } from '../diary/diary.service';

@Injectable()
export class CommonService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly diaryService: DiaryService
  ) {}

  async getTotal() {
    const articleTotal = await this.articleService.getTotal();
    const diaryTotal = await this.diaryService.getTotal();

    return [articleTotal, diaryTotal];
  }
}
