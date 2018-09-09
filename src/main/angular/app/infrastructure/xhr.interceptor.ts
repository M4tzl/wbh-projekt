import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      if(req.url.startsWith('/api')) {
          const xhr = req.clone({
              headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
          });
          return next.handle(xhr);
      }

      return next.handle(req);
  }
}
