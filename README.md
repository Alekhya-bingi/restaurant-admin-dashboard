# 🍽️ Restaurant Admin Dashboard

A full‑stack **Restaurant Admin Dashboard** built as part of the **Eatoes Intern – Technical Assessment**. This application allows restaurant owners to manage menu items, track orders, and update order statuses in real time.

---

## 🚀 Live Demo

* **Frontend (Netlify):** [https://your-frontend-url.netlify.app](https://your-frontend-url.netlify.app)
* **Backend API (Render):** [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)

---

## 📌 Features Implemented

### ✅ Menu Management

* View all menu items
* Add new menu items
* Search menu items with debouncing (300ms)
* Toggle availability (Optimistic UI update)
* Real‑time UI updates

### ✅ Orders Dashboard

* View all orders
* Order status tracking
* Update order status (Pending → Preparing → Ready → Delivered)
* Backend pagination‑ready structure

### ✅ Backend & Database

* RESTful APIs using Express.js
* MongoDB with Mongoose ODM
* Separate schemas for Menu Items & Orders
* Error handling and validation

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React 18, Axios                      |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas                        |
| Deployment | Netlify (Frontend), Render (Backend) |

---

## 📂 Project Structure

```
restaurant-admin-dashboard/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── menu.routes.js
│   │   └── order.routes.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   └── Order.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── MenuPage.jsx
    │   │   └── OrdersPage.jsx
    │   ├── api.js
    │   ├── hooks/useDebounce.js
    │   └── App.js
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

### Frontend (`frontend/src/api.js`)

```
baseURL=https://your-backend-url.onrender.com/api
```

---

## 📡 API Endpoints

### Menu APIs

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | /api/menu                  | Get all menu items  |
| GET    | /api/menu/search?q=        | Search menu items   |
| POST   | /api/menu                  | Create menu item    |
| PATCH  | /api/menu/:id/availability | Toggle availability |

### Order APIs

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | /api/orders            | Get all orders      |
| POST   | /api/orders            | Create new order    |
| PATCH  | /api/orders/:id/status | Update order status |

---

## 🧪 Sample Order Payload

```json
{
  "customerName": "Rahul",
  "items": [
    { "menuItem": "MENU_ID", "quantity": 2, "price": 120 }
  ],
  "totalAmount": 240,
  "status": "Pending",
  "tableNumber": 3
}
```

---

## 🧠 Challenges Faced & Solutions

* **API Overfetching:** Solved using debounced search
* **Optimistic UI updates:** Implemented rollback on failure
* **Deployment issues:** Fixed by proper environment configuration
* **CORS errors:** Resolved with Express CORS middleware

---

## 🏁 Installation & Setup

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📸 Screenshots

*(Add screenshots or GIFs here)*

---

## 👩‍💻 Author

**Name:** Alekhya Bingi
**Role:** Full‑Stack Developer (Beginner)
**Project:** Eatoes Intern Technical Assessment

---

## 🎉 Conclusion

This project demonstrates end‑to‑end full‑stack development skills including API design, MongoDB integration, React best practices, and real‑world deployment.

Thank you for reviewing my work! 🙌
