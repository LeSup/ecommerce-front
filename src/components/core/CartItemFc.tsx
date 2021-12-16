import { FC, useContext, useState } from "react";
import {
  CartItem,
  updateItem,
  deleteItem,
  itemCount,
} from "../../helpers/cart";
import { Button, Image, InputNumber } from "antd";
import { API } from "../../config";
import { TotalContext } from "../../anotherStore";

interface Props {
  product: CartItem;
  setCart: (arg: CartItem[]) => void;
}

const CartItemFc: FC<Props> = ({ product, setCart }) => {
  const [count, setCount] = useState<number>(product.count);
  const totalValue = useContext(TotalContext);

  const handleChange = (value: number) => {
    // 同步localStorage和父组件中的状态
    setCart(updateItem(product._id, value));
    // 同步当前组件状态
    setCount(value);
  };

  const handleDelete = () => {
    setCart(deleteItem(product._id));
    totalValue[1](itemCount());
  };

  return (
    <tr className='ant-table-row'>
      <td className='ant-table-cell'>
        <Image width={120} src={`${API}/product/photo/${product._id}`} />
      </td>
      <td className='ant-table-cell'>{product.name}</td>
      <td className='ant-table-cell'>{product.price}</td>
      <td className='ant-table-cell'>{product.category.name}</td>
      <td className='ant-table-cell'>
        <InputNumber precision={0} value={count} onChange={handleChange} />
      </td>
      <td className='ant-table-cell'>
        <Button onClick={handleDelete} danger type='primary'>
          删除
        </Button>
      </td>
    </tr>
  );
};

export default CartItemFc;
