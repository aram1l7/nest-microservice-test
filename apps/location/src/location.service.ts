import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  getLocation(id: string) {
    return { id, lat: 12.34, lng: 56.78 };
  }

  createLocation(data: any) {
    return { status: 'saved', data };
  }
}
