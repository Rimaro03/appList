import { Dispatch, SetStateAction } from 'react';

interface Item {
  description: string;
  title: string;
  data?: Item[];
  setData?: Dispatch<SetStateAction<Item[]>>
  index?: number;
}

export default Item;
