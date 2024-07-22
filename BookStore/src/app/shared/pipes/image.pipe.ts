import { Pipe, PipeTransform } from '@angular/core';
import { APP_CONFIG } from '../../app.constant';

@Pipe({ name: 'image' })
export class ImagePipe implements PipeTransform {
    transform(value: string) {
        if(value.includes("http")) {
            return value;
        } else {
            return APP_CONFIG.imageUrl + value;
        }
    }
}
