import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiResponse } from "@/shared/api-response";
import { Student } from "@/students/students.entity";
import { StudentsService } from "@/students/students.service";
import { CreateStudentDto, UpdateStudentDto } from "@/students/students.dtos";
import { PetsService } from "@/pets/pets.service";

@Controller("api/students")
export class StudentsController {
	constructor(
		private readonly studentsService: StudentsService,
		private readonly petsService: PetsService,
	) {}

	@Get()
	public findAll() {
		return this.studentsService.findAll();
	}

	@Get(":id")
	public findById(@Param("id") id: string) {
		return this.studentsService.findById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	public create(@Body() body: CreateStudentDto): ApiResponse<Student> {
		const student = this.studentsService.create(body);
		return ApiResponse.success(student, "Estudiante creado con éxito", 201);
	}
	
	@Patch(":id")
	  public update(@Param("id") id: string, @Body() body: UpdateStudentDto) {
		const updatedStudent = this.studentsService.update(id, body);
		return ApiResponse.success(updatedStudent, "Estudiante actualizado con éxito");
	  }
	
	@Delete(":id")
	public delete(@Param("id") id: string) {
		const isDeleted = this.studentsService.delete(id);
		if (!isDeleted) {
			throw new NotFoundException(
				`No se encontró el estudiante con ID ${id}`,
			);
		}
		this.petsService.deleteAllForStudent(id);
		return ApiResponse.success(null, "Estudiante eliminado con éxito");
	}
}