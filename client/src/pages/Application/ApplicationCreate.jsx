import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import instance from "../../core/api.js";
import { toast } from "react-toastify";

const { Option } = Select;

export const ApplicationCreate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    instance
      .post("/applications", {
        ...values,
        userId: user.id,
        fullName: user?.fullName,
        contactPhone: user?.phone,
        desiredDate: values.desiredDate.toISOString(),
      })
      .then(() => {
        void toast.success("Заявка успешно создана!");
        form.resetFields();
      })
      .catch(() => toast.error("Что-то пошло не так"));
  };

  return (
    <div className="page">
      <Card className="card">
        <h1 className="title">Создание новой заявки</h1>
        <Link to="/applications/list">Список заявок</Link>

        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            fullName: user?.fullName,
            contactPhone: user?.phone,
            serviceType: "general_cleaning",
            paymentType: "cash",
          }}
          layout="vertical"
        >
          <Form.Item name="address" label="Адрес" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="Контактный телефон"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desiredDate"
            label="Желаемая дата"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="desiredTime"
            label="Желаемое время"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="serviceType"
            label="Тип услуги"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="general_cleaning">Генеральная уборка</Option>
              <Option value="deep_cleaning">Глубокая уборка</Option>
              <Option value="post_construction">После ремонта</Option>
              <Option value="dry_cleaning">Химчистка</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentType"
            label="Способ оплаты"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="cash">Наличные</Option>
              <Option value="card">Карта</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Создать заявку
          </Button>
        </Form>
      </Card>
    </div>
  );
};
