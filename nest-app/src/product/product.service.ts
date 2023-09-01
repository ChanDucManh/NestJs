import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product,ProductSchema,ProductDocument } from './schemas/product.shemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Chua xu ly loi
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) public model: Model<ProductDocument>) {}
  async create(createProductDto: CreateProductDto) {
    var model = new this.model(createProductDto);
    await model.save();
    return 'This action adds a new product';
  }

async findAll() {
    let data = await this.model.find();
    return data;
  }

  findOne(name: string) {
    let data = this.model.find({name:{$eq: name}});
    return data;
  }

async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.model.findOneAndUpdate(
      { name: id }, 
      { $set: updateProductDto },
      { new: true }
    );
    return `This action update a product #${id}`;
}

async remove(id: string) {
    const deleteProduct = await this.model.findOneAndDelete(
      {name:id}
    );
    return `This action removes a product #${id}`;
  }
}
