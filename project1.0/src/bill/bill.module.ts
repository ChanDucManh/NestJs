import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schema/bill.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }])],
  controllers: [BillController],
  providers: [BillService],
  exports:[BillService]
})
export class BillModule {}
