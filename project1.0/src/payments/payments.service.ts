import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payments } from './schema/payment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payments.name) private readonly billDetalModel: Model<Payments>) {}
  
  async create(createPaymentsDto: CreatePaymentDto): Promise<Payments> {
    const createdPayments = new this.billDetalModel(createPaymentsDto);
    return createdPayments.save();
  }

  async findAll(): Promise<Payments[]> {
    return this.billDetalModel.find().exec();
  }

  async findOne(id: number): Promise<Payments | null> {
    return this.billDetalModel.findOne({ id }).exec();
  }

  async update(id: number, updatePaymentsDto: UpdatePaymentDto) {
    try{
      const payment = await this.billDetalModel.updateOne({id:id},{$set:updatePaymentsDto});
      return payment.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: number) {
    try{
      const payment = await this.billDetalModel.deleteOne({id:id});
      return payment.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
