import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getGreet(@Res() res) {
    res.json({
      code: 200,
      msg: this.userService.getGreet(),
    });
  }
}
