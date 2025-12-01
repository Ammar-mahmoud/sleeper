import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { createChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2025-11-17.clover',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({card, amount, currency}: createChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method: paymentMethod.id,
      confirm: true,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }
}
