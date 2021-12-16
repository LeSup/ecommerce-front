import { Checkbox, List, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/actions/category.action";
import { AppState } from "../../store/reducers";
import { CategoryState } from "../../store/reducers/category.reducer";

const { Title } = Typography;

interface Props {
  onChange: (value: string[]) => void;
}

const CheckBox: FC<Props> = ({ onChange }) => {
  const dispatch = useDispatch();

  const {
    category: { result },
  } = useSelector<AppState, CategoryState>((state) => state.category);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleChange = (checkedValue: CheckboxValueType[]) => {
    onChange(checkedValue as string[]);
  };

  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <Checkbox.Group onChange={handleChange}>
        <List
          dataSource={result}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <Checkbox value={item._id}>{item.name}</Checkbox>
            </List.Item>
          )}
        />
      </Checkbox.Group>
    </>
  );
};

export default CheckBox;
