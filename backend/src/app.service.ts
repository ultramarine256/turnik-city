import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      title: 'TurnikCity API',
      version: '0.0.1',
      buildId: '-build.id-',
      lastDeployDateTimeUtc: '-deploy.date-time-',
    };
  }

  getHello() {
    return {
      title: 'Turnik city',
    };
  }
}
