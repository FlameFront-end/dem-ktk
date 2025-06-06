import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../core/api.js";

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    instance
      .post("/auth/register", values)
      .then(() => {
        toast.success("Успешная регистрация");
        navigate("/auth/login");
      })
      .catch(() => toast.error("Что-то пошло не так"));
  };

  return (
    <div className="page">
      <Card className="card auth-card">
        <h1 className="title">Регистрация аккаунта</h1>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input placeholder="Никнейм" />
          </Form.Item>

          <Form.Item name="fullName" rules={[{ required: true }]}>
            <Input placeholder="Полное имя" />
          </Form.Item>

          <Form.Item name="phone" rules={[{ required: true }]}>
            <Input placeholder="Телефон" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Почта" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <Link to="/auth/login">Уже есть аккаунт? Войти</Link>
      </Card>
    </div>
  );
};
