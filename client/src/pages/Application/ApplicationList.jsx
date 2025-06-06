import { useState, useEffect } from "react";
import { List, Card, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import instance from "../../core/api.js";

const { Text } = Typography;

const statusColors = {
  pending: "orange",
  in_progress: "blue",
  completed: "green",
  cancelled: "red",
};

const statusNames = {
  pending: "В ожидании",
  in_progress: "В процессе",
  completed: "Завершена",
  cancelled: "Отменена",
};

export const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    instance
      .get(`/applications/my/${userId}`)
      .then((r) => setApplications(r.data));
  }, []);

  return (
    <div className="page">
      <Card className="card">
        <h1 className="title">История заявок</h1>
        <Link to="/applications/create">Создать заявку</Link>

        <List
          dataSource={applications}
          renderItem={(app) => (
            <Card key={app.id} style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>{app.serviceType.replace("_", " ")}</Text>
                <Tag color={statusColors[app.status] ?? "orange"}>
                  {statusNames[app.status] ?? "В ожидании"}
                </Tag>
              </div>

              <div style={{ marginTop: 12 }}>
                <p>
                  <Text strong>Дата:</Text>{" "}
                  {new Date(app.desiredDate).toLocaleDateString("ru-RU")} в{" "}
                  {new Date(app.desiredTime).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <Text strong>Адрес:</Text> {app.address}
                </p>
                <p>
                  <Text strong>Оплата:</Text>{" "}
                  {app.paymentType === "cash" ? "Наличные" : "Карта"}
                </p>
                <p>
                  <Text strong>Создана:</Text>{" "}
                  {new Date(app.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </Card>
          )}
        />
      </Card>
    </div>
  );
};
