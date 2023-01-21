import uuid from 'react-native-uuid';
import {ControlType} from './ControlType';

export class Category {
  public id: string = uuid.v4() as string;
  public name: string = '';
  public attributes: CategoryAttribute[] = [];
  public items: CategoryItem[] = [];
  public titleAttribute: string = '';
}

export class CategoryAttribute {
  public id: string = uuid.v4() as string;
  public name: string = '';
  public type: ControlType = ControlType.Text;
}

export class CategoryItem extends CategoryAttribute {
  public value: string = '';
}
