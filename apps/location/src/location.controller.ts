import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':id')
  getLocation(@Param('id') id: string) {
    return this.locationService.getLocation(id);
  }

  @Post()
  createLocation(@Body() data: any) {
    return this.locationService.createLocation(data);
  }
}
