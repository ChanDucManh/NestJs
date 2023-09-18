import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { Category } from './schema/product_categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductCategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel:Model<Category>){}
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const createCategory = new this.categoryModel(createProductCategoryDto);
    return createCategory.save();
  }

  async findAll() :Promise<Category[]>{
    return this.categoryModel.find().exec();
  }

  async findOne(id: number) {
    return this.categoryModel.findOne({ id }).exec();
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    try{
      const caterogy = await this.categoryModel.updateOne({id:id},{$set:updateProductCategoryDto});
      return caterogy.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: number) {
    try{
      const category = await this.categoryModel.deleteOne({id:id});
      return category.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
