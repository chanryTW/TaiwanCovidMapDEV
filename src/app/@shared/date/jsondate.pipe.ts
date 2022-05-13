import { Pipe, PipeTransform } from '@angular/core';
import { DateFormate } from './date';
import { DateService } from './date.service';

@Pipe({
  name: 'jsondate',
})
export class JsondatePipe implements PipeTransform {
  constructor(private date: DateService) {}

  /**
   * 顯示日期格式
   * @param jsondate 2021-09-09
   * @param option "date" | "datetime" | "m-d" | "md-hm" | "y-m"
   */
  transform(jsondate: string | null | undefined, option: DateFormate = 'date'): string | null {
    return jsondate ? this.date.format(jsondate, option) : '-';
  }
}
