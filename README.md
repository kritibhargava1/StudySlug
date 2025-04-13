# 🐌 StudySlug

A web app for UCSC students to connect with study buddies, join study groups, use AI tutors, and check real-time study locations on a live campus map.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kritibhargava1/StudySlug.git
cd StudySlug
```

### 2. Install Dependencies

Make sure you're in the root directory (where `package.json` is located), then run:

```bash
npm install
```

This will install both backend (server) and frontend (React) dependencies.

---

## 🔧 Running the App

### Option 1: Development mode (recommended)

Runs both the server and client at the same time:

```bash
npm run dev
```

- Server: runs with `nodemon` on port **9000**
- Client (React app): runs on **http://localhost:3000**

### Option 2: Run only the backend

```bash
node server.js
```

This starts your backend API on:

```
http://localhost:9000
```

Make sure MongoDB is running locally or update your `.env` file to connect to an external DB.

---

## 🌐 Access the App

Once the server and client are running, open:

```
http://localhost:3000
```

Use the login/signup page to get started.

---

## 📁 Project Structure

```
StudySlug/
├── server.js               # Backend entry point
├── client/ or src/         # React frontend
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
├── .env                    # Environment variables
├── package.json            # Project config & dependencies
└── README.md               # Setup instructions
```

---

## 🛠️ Environment Variables (`.env`)

Create a `.env` file in the root directory with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=9000
```

Make sure to restart your server after creating this file.

---

## ✅ Technologies Used

- React
- Express
- MongoDB + Mongoose
- Firebase Auth
- Leaflet.js
- Google Generative AI API
- Node.js

---

Happy Studying 🧠✨

Made with 💛 by the StudySlug Team

