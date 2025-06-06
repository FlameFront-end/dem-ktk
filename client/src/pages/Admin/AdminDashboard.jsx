import { useState, useEffect } from "react";
import { Table, Select, Input, Button, Tag, Tooltip, Card } from "antd";
import { useNavigate } from "react-router-dom";
import instance from "../../core/api.js";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Выполнено" },
  { value: "cancelled", label: "Отменено" },
];

const serviceTypes = {
  general_cleaning: "Генеральная уборка",
  deep_cleaning: "Глубокая уборка",
  post_construction: "После стройки",
  dry_cleaning: "Химчистка",
};

const statusColors = {
  pending: "orange",
  in_progress: "blue",
  completed: "green",
  cancelled: "red",
};

export const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [navigate]);

  const fetchApplications = () => {
    instance
      .get("/applications/admin/all")
      .then((r) => setApplications(r.data));
  };

  const handleUpdate = (id) => {
    instance.patch(`/applications/${id}`, formData).then(() => {
      toast.success("Статус обновлен");

      setEditingId(null);
      fetchApplications();
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "ФИО", dataIndex: ["user", "fullName"], key: "fullName" },
    { title: "Телефон", dataIndex: ["user", "phone"], key: "phone" },
    { title: "Адрес", dataIndex: "address", key: "address" },
    {
      title: "Услуга",
      key: "serviceType",
      render: (_, app) => serviceTypes[app.serviceType],
    },
    {
      title: "Дата",
      key: "date",
      render: (_, app) => new Date(app.desiredDate).toLocaleDateString("ru-RU"),
    },
    {
      title: "Время",
      dataIndex: "desiredTime",
      key: "time",
      render: (_, app) => new Date(app.desiredTime).toLocaleTimeString("ru-RU"),
    },
    {
      title: "Оплата",
      key: "payment",
      render: (_, app) => (app.paymentType === "cash" ? "Наличные" : "Карта"),
    },
    {
      title: "Статус",
      key: "status",
      render: (_, app) =>
        editingId === app.id ? (
          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            <Select
              placeholder="Новый статус"
              options={statusOptions.filter((opt) => opt.value !== app.status)}
              onChange={(value) => setFormData({ ...formData, status: value })}
            />
            {formData.status === "cancelled" && (
              <Input
                placeholder="Причина отмены"
                onChange={(e) =>
                  setFormData({ ...formData, cancelReason: e.target.value })
                }
              />
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                type="primary"
                size="small"
                onClick={() => handleUpdate(app.id)}
                disabled={
                  !formData.status ||
                  (formData.status === "cancelled" && !formData.cancelReason)
                }
              >
                Сохранить
              </Button>
              <Button size="small" onClick={() => setEditingId(null)}>
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <Tooltip
            title={app.cancelReason ? `Причина: ${app.cancelReason}` : null}
          >
            <Tag color={statusColors[app.status]}>
              {app.status === "pending" && "Ожидает"}
              {app.status === "in_progress" && "В работе"}
              {app.status === "completed" && "Выполнено"}
              {app.status === "cancelled" && "Отменено"}
            </Tag>
          </Tooltip>
        ),
    },
    {
      title: "Создана",
      key: "createdAt",
      render: (_, app) => new Date(app.createdAt).toLocaleDateString("ru-RU"),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, app) =>
        editingId !== app.id && (
          <Button
            size="small"
            onClick={() => {
              setEditingId(app.id);
              setFormData({});
            }}
          >
            Изменить
          </Button>
        ),
    },
  ];

  return (
    <div className="page">
      <Card className="card admin">
        <h1 className="title">Панель администратора</h1>
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="id"
          bordered
          size="small"
        />
      </Card>
    </div>
  );
};
