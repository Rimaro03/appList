import Item from './Item';

interface List {
  name: string;
  icon: string;
  iconColor: string;
  completed: Item[];
  notCompleted: Item[];
}

export default List;
