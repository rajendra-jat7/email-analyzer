import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { AnalyzeEmailResponse } from './email.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('analyze')
  async analyze(
    @Body('rawHeaders') rawHeaders: string,
  ): Promise<AnalyzeEmailResponse> {
    return this.emailService.analyze(rawHeaders);
  }
}
