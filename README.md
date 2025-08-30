### UrbanClap Backend Service Booking

A backend service for booking providers and offerings, inspired by UrbanClap.  
Built with **Node.js**, **Express.js**, **Sequelize (PostgreSQL)**, and tested with **Jest**.

---

## Features

- **User  signup & login** with JWT authentication  
- Manage **service providers** and **offerings**  
- Create and manage **bookings**  
- Sequelize **migrations & seeders**  
- Unit testing with **Jest** (DB calls mocked)  
- **Postman collection** for API testing  

---

## Tech Stack

- **Node.js + Express.js**  
- **PostgreSQL + Sequelize ORM**  
- **JWT Authentication**  
- **Jest (Unit Testing)**  

---

## Installation

1. **Clone Repository**

   ```bash
   git clone https://github.com/<your-username>/urbanclap_backend_service_booking.git
   cd urbanclap_backend_service_booking
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following content:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=urbanclap
   DB_DIALECT=postgres
   JWT_SECRET=your_secret_key
   ```

4. **Database Migration & Seed**

   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

5. **Start Server**

   ```bash
   npm start
   ```

   Server runs at: [http://localhost:4000](http://localhost:4000)

6. **Run Tests**

   ```bash
   npm test
   ```

---

## API Endpoints

### User

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/users` | Create user account  |
| POST   | `/api/users/login`  | Login and get JWT    |
| GET   | `/api/users` | Get user profile  |
| GET BY ID   | `/api/users/:id` | Get all user profiles  |


### Provider

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/providers`     | Create provider profile |
| GET   | `/api/providers` | Get provider profile  |
| GET BY ID   | `/api/providers/:id` | Get all provider profiles  |

### Offerings (Services)

| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| POST   | `/api/offerings`       | Add offering (service) |
| GET    | `/api/offerings`       | List all offerings     |
| GET BY ID   | `/api/offerings/:id`   | Get offering details   |


### Bookings

| Method | Endpoint                      | Description                             |
|--------|-------------------------------|---------------------------------------|
| POST   | `/api/bookings`               | Create a booking (**JWT required**)   |
| GET    | `/api/bookings/:id`           | Get booking by ID (**JWT required**)  |
| GET    | `/api/bookings/users/:userId` | Get all user bookings (**JWT required**) |
| PUT    | `/api/bookings/:id/status`    | Provider update booking status (**JWT required**) |



### Reviews

| Method | Endpoint                             | Description                      |
|--------|------------------------------------|---------------------------------|
| POST   | `/api/reviews`                     | Create a review (**JWT required**) |
| GET    | `/api/reviews/provider/:providerId` | Get all reviews for a provider      |

---

## Project Structure

```
urbanclap_backend_service_booking/
│── __tests__/
│── src/
│   │── config
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── utils/
│── app.ts
│── index.ts
│── .gitignore
│── jest.config.ts
│── package-lock.json
│── package.json
│── tsconfig.json
│── README.md
```

---

## Author

**Deepam Kumar**  
Backend Developer | Node.js | TypeScript | PostgreSQL