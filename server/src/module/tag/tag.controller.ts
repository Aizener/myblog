import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { TagParam } from 'src/decorator/router';
import { DeleteResult } from 'typeorm';
import { TagService } from './tag.service';
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/list')
  async getTagList(@Req() req, @Res() res) {
    const [data, total]: any = await this.tagService.find(req.query);
    res.json({
      code: 200,
      data: data,
      total: total
    })
  }

  @Get('/list/activity')
  async getTagAndArticle(@Res() res) {
    const data = await this.tagService.findTagAndArticle();
    const tags = data.map(item => {
      return {
        id: item.id,
        title: item.title,
        articles: item.articles.length
      }
    })
    res.json({
      code: 200,
      data: tags
    })
  }

  @Post('/save')
  async addArticle(@TagParam() diary, @Res() res) {
    const ret = await this.tagService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@TagParam() diary, @Res() res) {
    const ret = await this.tagService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.tagService.removeOne(id);
    if (ret.affected === 0) {
      throw new HttpException('删除的标签已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签删除成功'
    })
  }

  @Delete('/remove')
  async removeArticle(@Req() req, @Res() res) {
    const ids = req.body.ids;
    const ret: DeleteResult = await this.tagService.remove(ids);
    if (ret.affected === 0) {
      throw new HttpException('删除的标签已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签删除成功'
    })
  }
}
