import { type } from 'os';
import { IReportDetailsModel } from './models/i-report-details.model';
import { ReportStatusEnum } from './models/report-status.enum';
import { data } from './data';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  checkEnumType(type: string): ReportStatusEnum {
    return type === 'increase'
      ? ReportStatusEnum.Increase
      : ReportStatusEnum.Decrease;
  }

  allReports(type: string) {
    const reportStatus: ReportStatusEnum = this.checkEnumType(type);
    return data.filter((f) => f.status === reportStatus);
  }

  reportByID(type: string, id: string) {
    const reportStatus: ReportStatusEnum = this.checkEnumType(type);
    const dataList = data.filter((f) => f.status === reportStatus);
    return dataList.find((f) => f.uuid === id) || {};
  }

  addNewReport(type: string, body: { title: string }) {
    const reportStatus: ReportStatusEnum = this.checkEnumType(type);
    const payload: IReportDetailsModel = {
      title: body.title,
      uuid: uuid(),
      status: reportStatus,
    };
    data.push(payload);
    return payload.uuid;
  }

  modifyReport(type: string, id: string, body: { title: string }) {
    const reportStatus: ReportStatusEnum = this.checkEnumType(type);
    const currentID = data
      .filter((f) => f.status === reportStatus)
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
