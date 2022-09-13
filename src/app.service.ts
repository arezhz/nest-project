import { type } from 'os';
import { IReportDetailsModel } from './models/i-report-details.model';
import { ReportStatusEnum } from './models/report-status.enum';
import { data } from './data';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  checkEnumType(type: string): null | ReportStatusEnum {
    let reportStatus: null | ReportStatusEnum = null;
    switch (type) {
      case 'increase':
        reportStatus = ReportStatusEnum.Increase;
        break;
      case 'decrease':
        reportStatus = ReportStatusEnum.Decrease;
        break;
      default:
        reportStatus = null;
        break;
    }
    return reportStatus;
  }

  allReports(type: string) {
    const reportStatus: null | ReportStatusEnum = this.checkEnumType(type);
    if (reportStatus !== null) {
      return data.filter((f) => f.status === reportStatus);
    }
    return [];
  }

  reportByID(type: string, id: string) {
    const reportStatus: null | ReportStatusEnum = this.checkEnumType(type);
    if (reportStatus !== null) {
      const dataList = data.filter((f) => f.status === reportStatus);
      return dataList.find((f) => f.uuid === id) || {};
    }
    return {};
  }

  addNewReport(type: string, body: { title: string }) {
    const reportStatus: null | ReportStatusEnum = this.checkEnumType(type);
    if (reportStatus !== null) {
      const payload: IReportDetailsModel = {
        title: body.title,
        uuid: uuid(),
        status: reportStatus,
      };
      data.push(payload);
      return payload.uuid;
    }
    return '';
  }

  modifyReport(type: string, id: string, body: { title: string }) {
    const reportStatus: null | ReportStatusEnum = this.checkEnumType(type);
    if (reportStatus !== null) {
      const currentID = data.findIndex((f) => f.uuid === id);
      if (currentID >= 0) {
        data[currentID].title = body.title;
        return true;
      }
    }
    return false;
  }

  deleteReport(type: string, id: string) {
    const reportStatus: null | ReportStatusEnum = this.checkEnumType(type);
    if (reportStatus !== null) {
      const currentID = data.findIndex((f) => f.uuid === id);
      if (currentID >= 0) {
        data.splice(currentID, 1);
        return true;
      }
    }
    return false;
  }
}
