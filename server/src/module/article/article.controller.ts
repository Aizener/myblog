import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ArticleParam } from 'src/decorator/router/index';
import Article from 'src/entity/article.entity';
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

  @Get('/total')
  async getArticleTotal(@Res() res) {
    const total = await this.articleService.getTotal();
    res.json({
      code: HttpStatus.OK,
      data: total
    })
  }

  @Get(':id')
  @Bind(Param('id'))
  async getArticleById(id, @Res() res) {
    const article: Article = await this.articleService.findOne(id);
    if (!article) {
      res.json({
        code: HttpStatus.NOT_FOUND,
        msg: '文章已经不存在'
      })
      return;
    }
    res.json({
      code: HttpStatus.OK,
      data: article
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
    const _article = await this.articleService.findOne(article.id);
    if (!_article) {
      res.json({
        code: HttpStatus.NOT_FOUND,
        msg: '文章已经不存在'
      })
      return;
    }
    article.createTime = _article.createTime;
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

  @Post('/view/:id')
  @Bind(Param('id'))
  async addArticleView(id, @Res() res) {
    const article: Article = await this.articleService.findOne(id);
    if (!article) {
      res.json({
        code: HttpStatus.NOT_FOUND,
        msg: '文章已经不存在'
      })
      return;
    }
    article.view ++;
    const ret: Article = await this.articleService.save(article);
    res.json({
      code: HttpStatus.OK,
      data: ret
    })
  }

  @Post('/good/:id')
  @Bind(Param('id'))
  async addArticleGood(id, @Res() res) {
    const article: Article = await this.articleService.findOne(id);
    if (!article) {
      res.json({
        code: HttpStatus.NOT_FOUND,
        msg: '文章已经不存在'
      })
      return;
    }
    article.good ++;
    const ret: Article = await this.articleService.save(article);
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
