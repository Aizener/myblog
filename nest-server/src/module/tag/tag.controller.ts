import { Controller, Get, Req, Res } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/list')
  async getTagList(@Req() req, @Res() res) {
    const ret = await this.tagService.find();

    res.json({
      code: 200,
      data: ret
    });
  }
}
