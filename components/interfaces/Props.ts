import { Dispatch, SetStateAction } from 'react';
import Item from './Item';

interface Props {
  notCompleted: Item[],
  setNotCompleted: Dispatch<SetStateAction<Item[]>>
}

export default Props;
