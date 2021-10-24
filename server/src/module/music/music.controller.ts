import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { MusicParam } from 'src/decorator/router';
import { DeleteResult } from 'typeorm';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('/list')
  async getMusicList(@Req() req, @Res() res) {
    const [data, total]: any = await this.musicService.find(req.query);
    res.json({
      code: 200,
      data: data,
      total: total
    })
  }

  @Post('/save')
  async addArticle(@MusicParam() diary, @Res() res) {
    const ret = await this.musicService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@MusicParam() diary, @Res() res) {
    const ret = await this.musicService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.musicService.removeOne(id);
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
    const ret: DeleteResult = await this.musicService.remove(ids);
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
