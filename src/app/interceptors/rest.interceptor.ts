import { HttpContextToken, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, map } from 'rxjs';

// declare const alertify: any;

export const RESPONSE = new HttpContextToken<'message' | 'blob'>(() => 'message');

@Injectable({ providedIn: 'root' })
export class RestInterceptor implements HttpInterceptor {

    constructor() { }

    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<any> => {
        return next.handle(req).pipe(
            map(event => {
                if (event.type !== HttpEventType.Response) return event;

                if (req.context.get(RESPONSE) === 'blob') {
                    // HttpUtilities.download(event.body, HttpUtilities.fileName(event.headers))
                    return event.clone({ body: event.body });
                }

                if (event.body.status === 'success') {
                    return event.clone({ body: event.body.message });
                }

                // alertify.error(event.body.message);
                return;
            }),
            catchError(this.#catchErrorFn)
        );
    }

    #catchErrorFn = (err: any) => {
        // alertify.error('Su tiempo en sesión ha finalizado.');
        return err;
    }

}
