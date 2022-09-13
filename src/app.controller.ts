import { ReportStatusEnum } from './models/report-status.enum';
import { AppService } from './app.service';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { type } from 'os';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  getReports(@Param('type') type: string) {
    return this.appService.allReports(type);
  }

  @Get(':id')
  getReportByID(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.reportByID(type, id);
  }

  @Post()
  createReport() {
    console.log('created');
  }

  @Put(':id')
  modifyReport() {
    console.log('modify');
  }

  @Delete(':id')
  deleteReport() {
    console.log('deleted');
  }
}
