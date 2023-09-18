import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema';
import {Model} from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdUser = new this.productModel(createProductDto);
    return createdUser.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productModel.findOne({ id }).exec();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const product = await this.productModel.updateOne({id:id},{$set:updateProductDto});
      return product.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: number) {
    try{
      const product = await this.productModel.deleteOne({id:id});
      return product.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
