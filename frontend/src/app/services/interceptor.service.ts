import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  //We use Injector to get an instance of the product service
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
        headers: req.headers.set(
          'Authorization', `Bearer ${localStorage.getItem('token')}`
        )
    });

    //Middleware
    return next.handle(newRequest);
  }
}
