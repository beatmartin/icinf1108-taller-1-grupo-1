export class ApiResponse<T> {
	success: boolean;
	status: number;
	message: string;
	data: T | null;

	constructor(
		success: boolean,
		status: number,
		message: string,
		data: T | null = null,
	) {
		this.success = success;
		this.status = status;
		this.message = message;
		this.data = data;
	}

	static success<T>(
		data: T | null,
		message: string = "Operación exitosa",
		status: number = 200,
	): ApiResponse<T> {
		return new ApiResponse(true, status, message, data);
	}
}