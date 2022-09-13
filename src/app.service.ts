import { ReportStatusEnum } from './models/report-status.enum';
import { data } from './data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  allReports(type: string) {
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
    if (reportStatus !== null) {
      return data.filter((f) => f.status === reportStatus);
    }
    return [];
  }

  reportByID(type: string, id: string) {
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
    if (reportStatus !== null) {
      const dataList = data.filter((f) => f.status === reportStatus);
      return dataList.find((f) => f.uuid === id) || {};
    }
    return {};
  }
}
