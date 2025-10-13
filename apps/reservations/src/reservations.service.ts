import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { FilterQuery } from 'mongoose';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create({ 
      ...createReservationDto,
      userId: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
     });
  }

  findAll(filterQuery: FilterQuery<ReservationDocument> = {}) {
    return this.reservationsRepository.find(filterQuery);
  }
  
  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate({ _id }, updateReservationDto);
  }

  remove(_id: string) {
    return this.reservationsRepository.findOneAndHardDelete({ _id });
  }
}
