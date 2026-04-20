import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email') // lesa me4 4a8al
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    // debug log removed; use centralized logger instead
    await this.notificationsService.notifyEmail(data);
  }
}
