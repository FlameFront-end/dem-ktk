import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/entities/admin.guard';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto, @Request() req) {
    return this.applicationService.create(createApplicationDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findAllByUser(@Request() req) {
    return this.applicationService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  async findAllForAdmin() {
    return this.applicationService.findAllWithUsers();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.updateStatus(id, updateApplicationDto);
  }
}
