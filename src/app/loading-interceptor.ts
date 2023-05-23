import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.loadingService.show();

        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }
}