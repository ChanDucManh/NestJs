import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BillDetails } from './schema/bill_details.schema';
import { Model } from 'mongoose';

@Injectable()
export class BillDetailsService {
  constructor(
    @InjectModel(BillDetails.name) private readonly billDetalModel: Model<BillDetails>){}
  
  async create(createBillDetailsDto: CreateBillDetailDto): Promise<BillDetails> {
    const createdBillDetails = new this.billDetalModel(createBillDetailsDto);
    return createdBillDetails.save();
  }

  async findAll(bill_id:number): Promise<BillDetails[]> {
    return this.billDetalModel.find({bill_id:bill_id}).exec();
  }

  async fillAllByBillId(billId:number):Promise<BillDetails[]>{
    return this.billDetalModel.find({bill_id:billId}).exec();
  }

  async findOne(bill_id:number, id: number): Promise<BillDetails | null> {
    return this.billDetalModel.findOne({bill_id:bill_id,id:id}).exec();
  }

  async update(id: number, updateBillDetailsDto: UpdateBillDetailDto) {
    try{
      const billDetail = await this.billDetalModel.updateOne({id:id},{$set:updateBillDetailsDto});
      return billDetail.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: number) {
    try{
      const billDetail = await this.billDetalModel.deleteOne({id:id});
      return billDetail.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
