import { useState } from "react";
import instance from "../../../core/api.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import s from "../Application.module.scss";

export const ApplicationCreate = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    address: "",
    contactPhone: user?.phone || "",
    desiredDate: "",
    desiredTime: "",
    serviceType: "general_cleaning",
    paymentType: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    instance
      .post("/applications", {
        ...formData,
        desiredDate: new Date(formData.desiredDate).toISOString(),
      })
      .then(() => {
        toast.success("Заявка успешно создана!");
        setFormData({
          fullName: user?.fullName || "",
          address: "",
          contactPhone: user?.phone || "",
          desiredDate: "",
          desiredTime: "",
          serviceType: "general_cleaning",
          paymentType: "cash",
        });
      })
      .catch(() => {
        toast.error("Что-то пошло не так");
      });
  };

  return (
    <div className={s.applicationPage}>
      <h1>Создание новой заявки</h1>

      <Link to="/applications/list">Список заявок</Link>

      <div className={s.container}>
        <div className={s.formSection}>
          <h2>Новая заявка</h2>

          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.formGroup}>
              <label htmlFor="address">Адрес</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="contactPhone">Контактный телефон</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="desiredDate">Желаемая дата</label>
              <input
                type="date"
                id="desiredDate"
                name="desiredDate"
                value={formData.desiredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="desiredTime">Желаемое время</label>
              <input
                type="time"
                id="desiredTime"
                name="desiredTime"
                value={formData.desiredTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="serviceType">Тип услуги</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="general_cleaning">Генеральная уборка</option>
                <option value="deep_cleaning">Глубокая уборка</option>
                <option value="post_construction">После ремонта</option>
                <option value="dry_cleaning">Химчистка</option>
              </select>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="paymentType">Способ оплаты</label>
              <select
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                required
              >
                <option value="cash">Наличные</option>
                <option value="card">Карта</option>
              </select>
            </div>

            <button type="submit" className={s.submitButton}>
              Создать заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
