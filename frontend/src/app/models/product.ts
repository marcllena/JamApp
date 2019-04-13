export class Product {
  _id: string;
  name: string;
  picture: string;
  price: number;
  category: string;
  description: string;

  constructor(_id = '', name = '', picture = '', price = 0, category = '', description = ''){
    this._id = _id;
    this.name = name;
    this.picture = picture;
    this.price = price;
    this.category = category;
    this.description = description;
  }
}
