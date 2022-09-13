import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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
  createReport(@Param('type') type: string, @Body() body: { title: string }) {
    return this.appService.addNewReport(type, body);
  }

  @Put(':id')
  modifyReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { title: string },
  ) {
    return this.appService.modifyReport(type, id, body);
  }

  @Delete(':id')
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.deleteReport(type, id);
  }
}
