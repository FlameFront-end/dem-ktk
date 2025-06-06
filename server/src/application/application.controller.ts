import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBody({ type: CreateApplicationDto })
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get('my/:id')
  findAllByUser(@Param('id') id: number) {
    return this.applicationService.findAllByUser(id);
  }

  @Get('admin/all')
  async findAllForAdmin() {
    return this.applicationService.findAllWithUsers();
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.updateStatus(id, updateApplicationDto);
  }
}
