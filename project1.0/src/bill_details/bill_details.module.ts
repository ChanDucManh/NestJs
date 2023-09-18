import { Module } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { BillDetailsController } from './bill_details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillDetails, BillDetailsSchema } from './schema/bill_details.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BillDetails.name, schema: BillDetailsSchema }])],
  controllers: [BillDetailsController],
  providers: [BillDetailsService],
})
export class BillDetailsModule {}
