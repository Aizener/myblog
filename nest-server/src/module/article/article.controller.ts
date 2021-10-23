import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { User } from 'src/decorator/router/index';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  async getArticleList(@User() user, @Res() res) {
    console.log(user);
    const ret = await this.articleService.find(1, 10);
    res.json({
      code: 200,
      data: ret
    })
  }

  @Post('/save')
  async addArticle(@Req() req, @Res() res) {
    console.log(req.body, req.params);
    res.json({
      code: 200,
      data: req.body
    })
  }
}
