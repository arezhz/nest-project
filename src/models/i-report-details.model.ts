import { ReportStatusEnum } from './report-status.enum';

export interface IReportDetailsModel {
  uuid: string;
  title: string;
  status: ReportStatusEnum;
}
