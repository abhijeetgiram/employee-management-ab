import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileFormat',
  standalone: true,
})
export class MobileFormatPipe implements PipeTransform {
  transform(mobileNumber: string): string {
    if (!mobileNumber || mobileNumber.length !== 10) {
      return mobileNumber;
    }

    // Format: (+91) 12345 12345
    const firstPart = mobileNumber.slice(0, 5);
    const secondPart = mobileNumber.slice(5);
    return `(+91) ${firstPart} ${secondPart}`;
  }
}
