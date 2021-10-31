import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService
  ) {}

  @Get('/total')
  async getTotal(@Res() res) {
    const [articleTotal, diaryTotal] = await this.commonService.getTotal();
    res.json({
      code: HttpStatus.OK,
      data: {
        article: articleTotal,
        diary: diaryTotal
      }
    })
  }
}
