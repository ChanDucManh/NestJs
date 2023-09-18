import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoriesModule } from './product_categories/product_categories.module';
import { ProductsModule } from './products/products.module';
import { BillDetailsModule } from './bill_details/bill_details.module';
import { BillModule } from './bill/bill.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/test'),
    UsersModule,
    ProductCategoriesModule,
    ProductsModule,
    BillDetailsModule,
    BillModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
