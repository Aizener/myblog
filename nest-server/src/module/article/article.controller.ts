import { Bind, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ArticleParam } from 'src/decorator/router/index';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  async getArticleList(@Req() req, @Res() res) {
    const [data, total]: any = await this.articleService.find(req.query);
    res.json({
      code: 200,
      data: data,
      total: total,
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

  @Put('/save')
  async updateArticle(@ArticleParam() article, @Res() res) {
    const ret = await this.articleService.save(article);
    res.json({
      code: 200,
      data: ret,
      msg: '文章修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: any = this.articleService.removeOne(id);
    res.json({
      code: 200,
      data: ret
    })
  }

  @Delete('/remove')
  async removeArticle(@Req() req, @Res() res) {
    const ids = req.body.ids;
    const ret: any = this.articleService.remove(ids);
    res.json({
      code: 200,
      data: ret
    })
  }
}
