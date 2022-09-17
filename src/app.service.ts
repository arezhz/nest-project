import { type } from 'os';
import { IReportDetailsModel } from './models/i-report-details.model';
import { ReportStatusEnum } from './models/report-status.enum';
import { data } from './data';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {

  allReports(type: ReportStatusEnum) {
    return data.filter((f) => f.status === type);
  }

  reportByID(type: ReportStatusEnum, id: string) {
    const dataList = data.filter((f) => f.status === type);
    return dataList.find((f) => f.uuid === id) || {};
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
