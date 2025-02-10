import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
    constructor(private coordinatsService: RiderCoordinatesService){}
    @Get(":id")
    async getRiderCoordinates(
        @Param()
        params: any
    ){
        console.log('params', params)
        return this.coordinatsService.getRiderCoordiantes(params.id);
    }
    @Post()
    async saveRiderCoordiantes(
        @Body()
        createCoordinateDTO: CraeteCoordinatesDTO
    ){
        return this.coordinatsService.saveRiderCoordiantes(createCoordinateDTO)
    }
}
