import { Controller, Get, Post, Body, Patch, Param, Delete, ConsoleLogger } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { ProductsService } from 'src/products/products.service';
import { BillService } from 'src/bill/bill.service';

@Controller('bill/bill-details')
export class BillDetailsController {
  constructor(
    private readonly billDetailsService: BillDetailsService,
    private productService:ProductsService,
    private billService:BillService
    ) {}

  @Post()
  async create(@Body() createBillDetailDto: CreateBillDetailDto) {
    var productId = createBillDetailDto["product_id"];
    var billId = createBillDetailDto["bill_id"];
    var priceJson = await this.productService.getPriceProduct(productId);
    var price = priceJson["price"];
    const [add,result] = await Promise.all([
    this.billService.addTotal(billId,price),
    this.billDetailsService.create(createBillDetailDto),
    ]);
    return result;
  }

  @Get('/:bill_id')
  findAll(@Param('bill_id') bill_id: number) {
    return this.billDetailsService.findAll(bill_id);
  }

  @Get('/:bill_id/:id')
  findOne(@Param('bill_id') bill_id: number, @Param('id') id: number) {
    return this.billDetailsService.findOne(bill_id, id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBillDetailDto: UpdateBillDetailDto) {
    return this.billDetailsService.update(id, updateBillDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.billDetailsService.remove(id);
  }
}
