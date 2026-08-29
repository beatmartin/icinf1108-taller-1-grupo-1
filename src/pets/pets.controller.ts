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
import { Pet } from "@/pets/pets.entity";
import { PetsService } from "@/pets/pets.service";
import { CreatePetDto, UpdatePetDto } from "@/pets/pets.dtos";

@Controller("api/students/:studentId/pets")
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Get()
	public findAll(@Param("studentId") studentId: string) {
		return this.petsService.findAllForStudent(studentId);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	public create(
		@Param("studentId") studentId: string,
		@Body() body: CreatePetDto,
	): ApiResponse<Pet> {
		const pet = this.petsService.create(studentId, body);
		return ApiResponse.success(pet, "Mascota creada con éxito", 201);
	}

	@Patch(":petId")
	  public update(
		@Param("studentId") studentId: string,
		@Param("petId") petId: string,
		@Body() body: UpdatePetDto,
	  ) {
		const updatedPet = this.petsService.update(studentId, petId, body);
		return ApiResponse.success(updatedPet, "Mascota actualizada con éxito");
	  }
	
	@Delete(":petId")
	public delete(
		@Param("studentId") studentId: string,
		@Param("petId") petId: string,
	) {
		const isDeleted = this.petsService.delete(studentId, petId);
		if (!isDeleted) {
			throw new NotFoundException(
				`No se encontró la mascota con ID ${petId} para el estudiante con ID ${studentId}`,
			);
		}
		return ApiResponse.success(null, "Mascota eliminada con éxito");
	}
}
