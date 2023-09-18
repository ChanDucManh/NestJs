import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schema/bill.schema';
import { Model } from 'mongoose';

@Injectable()
export class BillService {
  constructor(@InjectModel(Bill.name) private readonly billModel: Model<Bill>) {}
  
  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const createdBill = new this.billModel(createBillDto);
    return createdBill.save();
  }

  async findAll(): Promise<Bill[]> {
    return this.billModel.find().exec();
  }

  async findOne(id: number): Promise<Bill | null> {
    return this.billModel.findOne({ id }).exec();
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    try{
      const bill = await this.billModel.updateOne({id:id},{$set:updateBillDto});
      return bill.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: number) {
    try{
      const bill = await this.billModel.deleteOne({id:id});
      return bill.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
