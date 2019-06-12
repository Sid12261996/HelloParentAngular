import {Category} from '../enum/enum';

export class ConversionEnum {
  public getCategoryEnumText(cat: number): string {
    const category = Object.getOwnPropertyNames(Category);
    return category[cat];
  }
}
