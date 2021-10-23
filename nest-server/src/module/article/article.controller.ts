import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ArticleParam } from 'src/decorator/router/index';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  async getArticleList(@Req() req, @Res() res) {
    const ret = await this.articleService.find(1, 10);
    res.json({
      code: 200,
      data: ret
    })
  }

  @Post('/save')
  async addArticle(@ArticleParam() article, @Res() res) {
    const ret = await this.articleService.save(article);
    res.json({
      code: 200,
      data: ret,
      msg: '文章添加成功'
    })
  }
}
