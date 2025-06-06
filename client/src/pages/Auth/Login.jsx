import { Button, Card, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../core/api.js";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    instance
      .post("/auth/login", values)
      .then((response) => {
        const { data } = response;

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("userId", data.id);

        navigate(data.isAdmin ? "/admin" : "/applications/list");
        void toast.success("Успешная авторизация");
      })
      .catch((err) => {
        void toast.error(
          err.response.status === 401
            ? "Неверная почта или пароль"
            : "Что-то пошло не так",
        );
      });
  };

  return (
    <div className="page">
      <Card className="card">
        <Form onFinish={handleSubmit}>
          <h1 className="title">Вход в аккаунт</h1>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Введите email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>

          <Link to="/auth/register">Нет аккаунта? Зарегистрироваться</Link>
        </Form>
      </Card>
    </div>
  );
};
