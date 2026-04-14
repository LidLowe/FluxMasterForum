import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Auth } from "../../services/auth/auth";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
	const authToken = inject(Auth).getToken();

	if (authToken != null) {
		const newReq = req.clone({
			headers: req.headers.append("Authorization", `Bearer ${authToken}`)
		});

		return next(newReq);
	}

	return next(req);
}