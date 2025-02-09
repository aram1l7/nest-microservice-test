import { Module } from '@nestjs/common';
import { RiderCoordinatesController } from './rider-coordinates.controller';
import { RiderCoordinatesService } from './rider-coordinates.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RiderCoordinateSchema,RiderCoordinate } from './schemas/rider-coordinates.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [{ name: RiderCoordinate.name, schema: RiderCoordinateSchema }]
    )],
  controllers: [RiderCoordinatesController],
  providers: [RiderCoordinatesService]
})
export class RiderCoordinatesModule {}
