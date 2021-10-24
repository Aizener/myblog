import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { DiaryParam } from 'src/decorator/router';
import { DeleteResult } from 'typeorm';
import { DiaryService } from './diary.service';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('/list')
  async getArticleList(@Req() req, @Res() res) {
    const [data, total]: any = await this.diaryService.find(req.query);
    res.json({
      code: HttpStatus.OK,
      data: data,
      total: total,
    })
  }

  @Post('/save')
  async addArticle(@DiaryParam() diary, @Res() res) {
    const ret = await this.diaryService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '日志添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@DiaryParam() diary, @Res() res) {
    const ret = await this.diaryService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '日志修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.diaryService.removeOne(id);
    if (ret.affected === 0) {
      throw new HttpException('删除的日志已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '日志删除成功'
    })
  }

  @Delete('/remove')
  async removeArticle(@Req() req, @Res() res) {
    const ids = req.body.ids;
    const ret: DeleteResult = await this.diaryService.remove(ids);
    if (ret.affected === 0) {
      throw new HttpException('删除的日志已不存在', HttpStatus.OK);
    }
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '日志删除成功'
    })
  }
}
