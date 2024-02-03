import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(//private toaster: ToastrService,
    private router: Router,
    private Inject:Injector,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.toaster.error(error.error.message);
        //another way if appear in console circle proplem
        let toaster = this.Inject.get(ToastrService)
        toaster.error(error.error.message)
        if (error.error.message == "Jwt expired" || error.error.message == "Jwt must provide") {
          this.router.navigate(['/login'])
        }
        localStorage.removeItem('token')
        return throwError(error);
      })
    );
  }
}
