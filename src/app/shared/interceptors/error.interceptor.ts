import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 400:
              console.error(err, '400');
              break;
            case 404:
              console.error(err, '404')
              break;
            case 422:
              console.error(err, '422')
              break;
            case 500:
              console.error('Erreur serveur', '500')
              break;
            default:
              console.error("Erreur serveur", 'Erreur inconnue')
          }
        }

      }
    })
  )
};
