import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../core/api.js";
import s from "./AdminDashboard.module.scss";

export const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [editingStatus, setEditingStatus] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.isAdmin) {
      navigate("/auth/login");
      return;
    }

    fetchApplications();
  }, [navigate]);

  const fetchApplications = () => {
    instance.get("/applications/admin/all").then((r) => {
      setApplications(r.data);
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const startEditingStatus = (appId, currentStatus) => {
    setEditingStatus({ appId, currentStatus });
    setSelectedStatus("");
    setCancelReason("");
  };

  const cancelEditing = () => {
    setEditingStatus(null);
    setSelectedStatus("");
    setCancelReason("");
  };

  const handleStatusChange = () => {
    const payload = {
      status: selectedStatus,
      ...(selectedStatus === "cancelled" && { cancelReason }),
    };

    instance.patch(`/applications/${editingStatus.appId}`, payload).then(() => {
      fetchApplications();
      cancelEditing();
    });
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = [
      { value: "in_progress", label: "В работе" },
      { value: "completed", label: "Выполнено" },
      { value: "cancelled", label: "Отменено" },
    ];

    return allStatuses.filter((status) => status.value !== currentStatus);
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1>Панель администратора</h1>
      </header>

      <div className={s.applicationsTable}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Услуга</th>
              <th>Дата</th>
              <th>Время</th>
              <th>Оплата</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.user.fullName}</td>
                <td>{app.user.phone}</td>
                <td>{app.address}</td>
                <td>
                  {app.serviceType === "general_cleaning" &&
                    "Генеральная уборка"}
                  {app.serviceType === "deep_cleaning" && "Глубокая уборка"}
                  {app.serviceType === "post_construction" &&
                    "Послестроительная уборка"}
                  {app.serviceType === "dry_cleaning" && "Химчистка"}
                </td>
                <td>{formatDate(app.desiredDate)}</td>
                <td>{app.desiredTime}</td>
                <td>{app.paymentType === "cash" ? "Наличные" : "Карта"}</td>
                <td>
                  {editingStatus?.appId === app.id ? (
                    <div className={s.statusEditContainer}>
                      <select
                        className={s.statusSelect}
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">Выберите статус</option>
                        {getStatusOptions(editingStatus.currentStatus).map(
                          (option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ),
                        )}
                      </select>

                      {selectedStatus === "cancelled" && (
                        <div className={s.cancelReasonContainer}>
                          <input
                            type="text"
                            placeholder="Причина отмены"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className={s.cancelReasonInput}
                          />
                        </div>
                      )}

                      <div className={s.actionButtons}>
                        <button
                          onClick={handleStatusChange}
                          disabled={
                            !selectedStatus ||
                            (selectedStatus === "cancelled" && !cancelReason)
                          }
                          className={s.confirmButton}
                        >
                          Подтвердить
                        </button>
                        <button
                          onClick={cancelEditing}
                          className={s.cancelButton}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={s.statusContainer}>
                      <span className={`${s.status} ${s[app.status]}`}>
                        {app.status === "pending" && "Ожидает"}
                        {app.status === "in_progress" && "В работе"}
                        {app.status === "completed" && "Выполнено"}
                        {app.status === "cancelled" && "Отменено"}
                      </span>
                      {app.cancelReason && app.status === "cancelled" && (
                        <div className={s.reasonTooltip}>
                          <span className={s.tooltipText}>
                            Причина: {app.cancelReason}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td>{formatDate(app.createdAt)}</td>
                <td>
                  {editingStatus?.appId !== app.id && (
                    <button
                      onClick={() => startEditingStatus(app.id, app.status)}
                      className={s.editButton}
                    >
                      Изменить
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
