import { Bind, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UserParam } from 'src/decorator/router';
import { DeleteResult } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  async getUserList(@Req() req, @Res() res) {
    const [data, total]: any = await this.userService.find(req.query);
    res.json({
      code: 200,
      data: data,
      total: total
    })
  }

  @Post('/save')
  async addArticle(@UserParam() diary, @Res() res) {
    const ret = await this.userService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签添加成功'
    })
  }

  @Put('/save')
  async updateArticle(@UserParam() diary, @Res() res) {
    const ret = await this.userService.save(diary);
    res.json({
      code: HttpStatus.OK,
      data: ret,
      msg: '标签修改成功'
    })
  }

  @Delete('/remove/:id')
  @Bind(Param('id'))
  async removeArticleOne(id, @Res() res) {
    const ret: DeleteResult = await this.userService.removeOne(id);
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
    const ret: DeleteResult = await this.userService.remove(ids);
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

