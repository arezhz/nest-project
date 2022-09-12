import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get('')
  getReports() {
    return [];
  }

  @Get(':id')
  getReportByID() {
    return {};
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
