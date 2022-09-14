import { ReportStatusEnum } from './models/report-status.enum';
import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  getReports(@Param('type', new ParseEnumPipe(ReportStatusEnum)) type: string) {
    return this.appService.allReports(type);
  }

  @Get(':id')
  getReportByID(
    @Param('type', new ParseEnumPipe(ReportStatusEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.reportByID(type, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportStatusEnum)) type: string,
    @Body() body: { title: string },
  ) {
    return this.appService.addNewReport(type, body);
  }

  @Put(':id')
  modifyReport(
    @Param('type', new ParseEnumPipe(ReportStatusEnum)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { title: string },
  ) {
    return this.appService.modifyReport(type, id, body);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
