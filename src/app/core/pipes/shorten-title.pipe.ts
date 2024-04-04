import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle',
  standalone:true
})
export class ShortenTitlePipe implements PipeTransform {

  transform(title: string): string {
    return title.split(' (')[0];
  }

}