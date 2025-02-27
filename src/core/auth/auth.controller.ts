import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './guards';
import { Request, Response } from 'express';
import { Public, SkipKey } from './decorators';
import { AuthRequest, ResetPasswordRequest } from './models';
import { ChangePasswordRequest } from './models/change-password.request';
import { TfaRequest, UserRequest } from '../user/models';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  public login(@Req() req: AuthRequest, @Res() res: Response) {
    return this.authService.login(req, res);
  }
  
  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post("/refresh")
  public refreshToken(@Req() req: UserRequest, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post("/sign-out")
  public signOut(@Req() req: UserRequest, @Res() res: Response) {
    return this.authService.signOut(req, res);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  public googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  public async googleCallback(@Req() req: AuthRequest, @Res() res: Response) {
    return await this.authService.login(req, res, true);
  }

  @Public()
  @Post('/send-email-verification')
  public sendEmailVerification() {

  }

  @Public()
  @Post('/reset-password')
  public resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
    return this.authService.resetPassword(resetPasswordRequest);
  }

  @Public()
  @Patch('/change-password/:tokenId')
  public changePassword(@Param('tokenId') tokenId: string, @Query('token') token: string, @Body() changePassworRequest: ChangePasswordRequest) {
    return this.authService.changePassword(tokenId, token, changePassworRequest);
  }

  @Public()
  @SkipKey()
  @Get('/email-verify')
  public emailVerification(@Query('tokenId') tokenId: string, @Query('token') token: string, @Res() res: Response) {
    return this.authService.emailVerify(tokenId, token, res);
  }

  @Get('/enable-2fa')
  public enable2fa(@Req() req: UserRequest, @Res() res: Response) {
    return this.authService.enable2fa(req, res);
  }

  @Post('/disable-2fa')
  public disable2fa(@Req() req: UserRequest, @Res() res: Response) {
    return this.authService.disable2fa(req, res);
  }

  @Public()
  @Post('/verify-2fa')
  public verify(@Body() tfaRequest: TfaRequest, @Req() req: Request, @Res() res: Response) {
    return this.authService.validate2faAuthorization(tfaRequest, req, res);
  }

  @Get('/check-auth')
  public checkAuth() {
    return { content: true };
  }
}
