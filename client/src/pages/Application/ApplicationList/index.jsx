import { useState, useEffect } from "react";
import s from "../Application.module.scss";
import instance from "../../../core/api.js";
import { Link } from "react-router-dom";

export const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    instance.get("/applications/my").then((r) => {
      setApplications(r.data);
    });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const translateStatus = (status) => {
    const statusMap = {
      pending: "В ожидании",
      in_progress: "В процессе",
      completed: "Завершена",
      cancelled: "Отменена",
    };

    return statusMap[status] || status;
  };

  return (
    <div className={s.applicationPage}>
      <h1>История заявок</h1>

      <Link to="/applications/create">Создать заявку</Link>

      <div className={s.container}>
        <div className={s.historySection}>
          <div className={s.applicationsList}>
            {applications.map((app) => (
              <div key={app.id} className={s.applicationCard}>
                <div className={s.applicationHeader}>
                  <span className={s.serviceType}>
                    {app.serviceType.replace("_", " ")}
                  </span>
                  <span className={`${s.status} ${s[app.status]}`}>
                    {translateStatus(app.status)}
                  </span>
                </div>
                <div className={s.applicationDetails}>
                  <p>
                    <strong>Дата:</strong> {formatDate(app.desiredDate)} в{" "}
                    {app.desiredTime}
                  </p>
                  <p>
                    <strong>Адрес:</strong> {app.address}
                  </p>
                  <p>
                    <strong>Оплата:</strong>{" "}
                    {app.paymentType === "cash" ? "Наличные" : "Карта"}
                  </p>
                  <p>
                    <strong>Создана:</strong> {formatDate(app.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
