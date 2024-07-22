import { NgModule } from "@angular/core";
import { ImagePipe } from "./pipes/image.pipe";

@NgModule({
    declarations: [
        ImagePipe
    ],
    imports: [],
    exports: [
        ImagePipe
    ],
})

export class SharedModule {};