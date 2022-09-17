import { ReportStatusEnum } from './models/report-status.enum';
import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';
import { createReportsBodyDto, modifyReportsBodyDto } from './dtos/reports.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  getReports(@Param('type', ParseIntPipe, new ParseEnumPipe(ReportStatusEnum)) type: ReportStatusEnum) {
    return this.appService.allReports(type);
  }

  @Get(':id')
  getReportByID(
    @Param('type', ParseIntPipe, new ParseEnumPipe(ReportStatusEnum)) type: ReportStatusEnum,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.reportByID(type, id);
  }

  @Post()
  createReport(
    @Param('type', ParseIntPipe, new ParseEnumPipe(ReportStatusEnum)) type: ReportStatusEnum,
    @Body() body: createReportsBodyDto,
  ) {
    return this.appService.addNewReport(type, body);
  }

  @Put(':id')
  modifyReport(
    @Param('type', ParseIntPipe, new ParseEnumPipe(ReportStatusEnum)) type: ReportStatusEnum,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: modifyReportsBodyDto,
  ) {
    return this.appService.modifyReport(type, id, body);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
