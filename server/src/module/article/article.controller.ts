import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ArticleParam } from 'src/decorator/router/index';
import { DeleteResult } from 'typeorm';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  async getArticleList(@Req() req, @Res() res) {
    const [data, total]: any = await this.articleService.find(req.query);
    res.json({
      code: HttpStatus.OK,
      data: data,
      total: total,
    })
  }

  @Post('/save')
  async addArticle(@ArticleParam() article, @Res() res) {
    const ret = await this.articleService.save(article);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '文章添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@ArticleParam() article, @Res() res) {
    const ret = await this.articleService.save(article);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '文章修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.articleService.removeOne(id);
    if (ret.affected > 0) {
      throw new HttpException('删除的文章已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret
    })
  }

  @Delete('/remove')
  async removeArticle(@Req() req, @Res() res) {
    const ids = req.body.ids;
    const ret: DeleteResult = await this.articleService.remove(ids);
    res.json({
      code: HttpStatus.OK,
      data: ret
    })
  }
}
