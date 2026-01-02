# ShopEasy – Full Stack E‑Commerce Application

---

##  Live Deployment

* **Frontend (Vercel):** [https://shop-easy-beryl-rho.vercel.app/](https://shop-easy-beryl-rho.vercel.app/)
* **Backend API (Render):** [https://shopeasy-backend-amsd.onrender.com](https://shopeasy-backend-amsd.onrender.com)
* **GitHub Repository:** [https://github.com/letscodewithmohit/shopEasy](https://github.com/letscodewithmohit/shopEasy)

---

##  Tech Stack

### Frontend

* **React.js** (Vite)
* **Redux Toolkit** (state management)
* **React Router DOM**
* **Axios** (API communication)
* **Tailwind CSS** (UI styling)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB Atlas**
* **Mongoose** (ODM)
* **JWT Authentication**
* **bcrypt** (password hashing)

### Deployment & Tools

* **Vercel** – Frontend hosting
* **Render** – Backend hosting
* **MongoDB Atlas** – Cloud database
* **Git & GitHub** – Version control

---

##  Key Features

### Authentication & Authorization

* User registration & login
* JWT‑based authentication
* Protected routes

### Product Management

* Product listing
* Category‑based filtering
* Product details page

### Cart Functionality

* Add / remove items from cart
* Quantity management
* Persistent cart state
* Disable checkout when cart is empty

### Order Management

* Secure checkout flow
* Place orders
* View order history
* Order details page
* Order success confirmation

### User Experience

* Profile page
* Auth‑based redirects
* Clean navigation & layout
* 404 Not Found handling

---

## Project Architecture

```
shopEasy/
│
├── ecom-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/ (Redux slices)
│   │   ├── pages/
│   │   ├── routes/
│   │   └── hooks/
│
├── ecom-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│
└── README.md
```

---

## Environment Variables

Environment variables are securely managed and **not pushed to GitHub**.

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```
VITE_API_BASE_URL=your_backend_url
```

---

## 🧠 Learning Outcomes

* Real‑world full‑stack architecture
* Secure authentication using JWT
* MongoDB Atlas cloud integration
* Deployment with environment separation
* Git branching & production workflows

---

## Author

**Manmohan Choudhary**
Frontend & Backend Developer

* GitHub: [https://github.com/letscodewithmohit](https://github.com/letscodewithmohit)

---

## 📌 Future Enhancements

* Online payment gateway integration
* Admin dashboard
* Product reviews & ratings
* Performance optimization

---

⭐ If you like this project, feel free to star the repository!
