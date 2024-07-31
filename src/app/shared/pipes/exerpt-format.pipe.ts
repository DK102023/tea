import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exerptFormat'
})
export class ExerptFormatPipe implements PipeTransform {

  transform(value: string, maxLength: number = 95): string {
    if (!value || value.length <= maxLength) {
      return value;
    }
    return value.substr(0, maxLength) + '...';
  }

}
