import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/')
  public getAnalytics(@Req() req: Request, @Res() res: Response) {

  }
}
