import { List, Radio, RadioChangeEvent, Typography } from "antd";
import { FC } from "react";
import prices from "../../helpers/price";

const { Title } = Typography;

interface Props {
  onChange: (args: number[]) => void;
}

const RadioBox: FC<Props> = ({ onChange }) => {
  const handleChange = (event: RadioChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <>
      <Title level={4}>按照价格筛选</Title>
      <Radio.Group>
        <List
          dataSource={prices}
          renderItem={(item) => (
            <List.Item>
              <Radio onChange={handleChange} value={item.array}>
                {item.name}
              </Radio>
            </List.Item>
          )}
        />
      </Radio.Group>
    </>
  );
};

export default RadioBox;
