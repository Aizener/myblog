import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CategoryParam } from 'src/decorator/router';
import { DeleteResult } from 'typeorm';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  async getCategoryList(@Req() req, @Res() res) {
    const [data, total]: any = await this.categoryService.find(req.query);
    res.json({
      code: 200,
      data: data,
      total: total
    })
  }

  @Post('/save')
  async addArticle(@CategoryParam() diary, @Res() res) {
    const ret = await this.categoryService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '分类添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@CategoryParam() diary, @Res() res) {
    const ret = await this.categoryService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '分类修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.categoryService.removeOne(id);
    if (ret.affected === 0) {
      throw new HttpException('删除的分类已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '分类删除成功'
    })
  }

  @Delete('/remove')
  async removeArticle(@Req() req, @Res() res) {
    const ids = req.body.ids;
    const ret: DeleteResult = await this.categoryService.remove(ids);
    if (ret.affected === 0) {
      throw new HttpException('删除的分类已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '分类删除成功'
    })
  }
}
