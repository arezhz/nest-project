/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exclude, Expose } from 'class-transformer';
import { ReportStatusEnum } from 'src/models/report-status.enum';

export class ReportResponseDto {
  uuid: string;
  @Exclude()
  title: string;
  status: ReportStatusEnum;

  @Expose()
  get fullTitle(): string {
    return `${this.title}-${this.status}`;
  }
  constructor(patrial: Partial<ReportResponseDto>) {
    Object.assign(this, patrial);
  }
}
