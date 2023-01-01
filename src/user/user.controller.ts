import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.userService.findAll(paginationQuery);
  }

  @Get('delete')
  async deleteAll() {
    return await this.userService.deleteAll();
  }
}
