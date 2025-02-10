import { Injectable } from '@nestjs/common';
import { CraeteCoordinatesDTO } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';

@Injectable()
export class RiderCoordinatesService {
    constructor(
        @InjectModel(RiderCoordinate.name)
        private readonly riderCoodinateModel : Model<RiderCoordinate>
    ){}

    async getRiderCoordiantes() {
      return await this.riderCoodinateModel.find()
      // communicate with rider microservice by uisng the rider id

      // communication can be happened, TCP, RabbitMQ, Kafka, Nats
    }
    async saveRiderCoordiantes(createCoordinateDTO: CraeteCoordinatesDTO) {
        return await this.riderCoodinateModel.create(createCoordinateDTO)
    }
}
