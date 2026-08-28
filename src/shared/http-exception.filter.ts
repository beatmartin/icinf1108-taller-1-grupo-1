import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from "@nestjs/common";

import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let message = "Error interno del servidor";

		if (exception instanceof HttpException) {
			const exceptionResponse = exception.getResponse();
			if (
				typeof exceptionResponse === "object" &&
				exceptionResponse !== null &&
				"message" in exceptionResponse
			) {
				const msg = (exceptionResponse as any).message;
				message = Array.isArray(msg) ? msg[0] : msg;
			} else if (typeof exceptionResponse === "string") {
				message = exceptionResponse;
			} else {
				message = exception.message;
			}
		}

		response.status(status).json({
			success: false,
			status: status,
			message: message,
			data: null,
		});
	}
}
