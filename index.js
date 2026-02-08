const express = require("express");
const app = express();

app.use(express.json());

// ====== ВРЕМЕННОЕ ХРАНИЛИЩЕ (пока без базы) ======
const users = [];              // зарегистрированные пользователи
const otpRequests = {};        // временные OTP-коды

// ====== ТЕСТОВЫЕ МАРШРУТЫ ======
app.get("/", (req, res) => {
  res.send("servis.kz API is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ====== OTP: ЗАПРОС КОДА ======
app.post("/auth/request-code", (req, res) => {
  const { phone, email, account_type, city } = req.body;

  // 1. Проверка обязательных полей
  if (!phone || !email || !account_type || !city) {
    return res.status(400).json({
      error: "phone, email, account_type и city обязательны",
    });
  }

  // 2. Проверка типа аккаунта
  if (account_type !== "client" && account_type !== "master") {
    return res.status(400).json({
      error: "account_type должен быть client или master",
    });
  }

  // 3. Проверка: не занят ли телефон или email
  const exists = users.find(
    (u) => u.phone === phone || u.email === email
  );

  if (exists) {
    return res.status(409).json({
      error: "Телефон или email уже зарегистрированы",
    });
  }

  // 4. Генерация OTP-кода
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  otpRequests[phone] = {
    code,
    email,
    account_type,
    city,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 минут
  };

  // 5. ЗАГЛУШКА: выводим код в консоль
  console.log(`OTP для ${phone}: ${code}`);

  return res.json({
    message: "Код отправлен (временно смотри в консоль сервера)",
  });
});

// ====== ЗАПУСК СЕРВЕРА ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
