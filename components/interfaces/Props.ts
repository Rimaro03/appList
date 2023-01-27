import { Dispatch, SetStateAction } from 'react';
import Item from './Item';

interface Props {
  data: Item[];
  setData: Dispatch<SetStateAction<Item[]>>
}

export default Props;
