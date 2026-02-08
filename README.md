# servis-kz-backend

Backend для servis.kz (Node.js + Express)

## Запуск локально
1) Установить зависимости:
   npm install

2) Запустить сервер:
   npm start

Ожидаемое сообщение в терминале:
Server started on port 3000

## Проверка в браузере
- http://localhost:3000/  (или твой health endpoint)

## Деплой (Render)
Render берёт код из GitHub, делает:
- Build Command: npm install
- Start Command: npm start

Важно: папку node_modules в GitHub не загружаем.
