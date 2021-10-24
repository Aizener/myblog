import { Controller, Get, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('/qiniu/token')
  async getQiniuToken(@Req() req, @Res() res) {
    const token = await this.uploadService.getQiniuToken()

    res.json({
      code: 200,
      data: token || null
    })
  }
}
