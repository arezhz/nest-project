import { IReportDetailsModel } from './models/i-report-details.model';
import { ReportStatusEnum } from './models/report-status.enum';
import { data } from './data';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report-response.dto';

@Injectable()
export class AppService {
  allReports(type: ReportStatusEnum): ReportResponseDto[] {
    return data
      .filter((f) => f.status === type)
      .map((m) => new ReportResponseDto(m));
  }

  reportByID(type: ReportStatusEnum, id: string): ReportResponseDto {
    const dataList = data.filter((f) => f.status === type);
    const result = dataList.find((f) => f.uuid === id) || {};
    return new ReportResponseDto(result);
  }

  addNewReport(type: ReportStatusEnum, body: { title: string }) {
    const payload: IReportDetailsModel = {
      ...body,
      uuid: uuid(),
      status: type,
    };
    data.push(payload);
    return payload.uuid;
  }

  modifyReport(type: ReportStatusEnum, id: string, body: { title: string }) {
    const currentID = data
      .filter((f) => f.status === type)
      .findIndex((f) => f.uuid === id);
    if (currentID >= 0) {
      data[currentID].title = body.title;
      return true;
    }
    return false;
  }

  deleteReport(id: string) {
    const currentID = data.findIndex((f) => f.uuid === id);
    if (currentID >= 0) {
      data.splice(currentID, 1);
      return true;
    }
    return false;
  }
}
