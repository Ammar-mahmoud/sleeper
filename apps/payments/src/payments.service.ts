import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payment-create-charge.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) { }

  private get stripe() {
    return new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-11-17.clover',
    });
  }

  async createCharge({ amount, paymentMethodId, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
     this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully.`,
    });

    return paymentIntent;
  }

}
