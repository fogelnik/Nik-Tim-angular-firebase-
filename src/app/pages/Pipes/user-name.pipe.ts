import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(email: string | null | undefined): string {
    if(email){
      return email.split('@')[0];
    }
    return 'Гость';
  }

}
