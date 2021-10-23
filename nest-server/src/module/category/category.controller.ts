import { Controller, Get, Req, Res } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  async getCategoryList(@Req() req, @Res() res) {
    const ret = await this.categoryService.find();
    res.json({
      code: 200,
      data: ret
    })
  }
}
