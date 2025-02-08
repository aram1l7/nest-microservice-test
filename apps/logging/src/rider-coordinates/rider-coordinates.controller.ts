import { Body, Controller, Get, Post } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
    @Get()
    getRiderCoordinates(){
        return 'Hello I am from rider coordinates'
    }
    @Post()
    saveRiderCoordiantes(
        @Body()
        createCoordinateDTO: CraeteCoordinatesDTO
    ){
       return createCoordinateDTO
    }
}
