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

  @Get('/list/activity')
  async getTagAndArticle(@Res() res) {
    const data = await this.categoryService.findCategoryAndArticle();
    const category = data.map(item => {
      return {
        id: item.id,
        title: item.title,
        articles: item.articles.length
      }
    })
    res.json({
      code: 200,
      data: category
    })
  }

  @Post('/save')
  async addArticle(@CategoryParam() category, @Res() res) {
    const ret = await this.categoryService.save(category);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '分类添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@CategoryParam() category, @Res() res) {
    const _category = await this.categoryService.findOne(category.id);
    if (_category) {
      throw new HttpException('修改的分类已不存在', HttpStatus.OK);
    }
    category.createTime = _category.createTime;
    const ret = await this.categoryService.save(category);
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
