# 📰 News App

A full-stack news application developed using **React** for the frontend and **Node.js** for the backend.

## 🚀 Features

* 📰 Browse and display news articles
* 🔍 Search for news articles by keyword
* 🗂️ Browse news by category
* 🔗 Frontend and backend integration
* ⚛️ React-based user interface
* 🟢 Node.js backend
* 🔄 API-based communication
* 📱 Responsive web interface
* 🔐 API key stored securely using environment variables

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv

### API

* NewsAPI

### Tools

* Git
* GitHub
* npm

## 🏗️ Project Structure

```text
News-App
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/sa-minz/News-App.git
cd News-App
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the News API key

Create a `.env` file inside the `backend` folder:

```env
NEWS_API_KEY=your_news_api_key
```

Replace `your_news_api_key` with your actual NewsAPI key.

> **Note:** Never upload the `.env` file to GitHub. It is already excluded using `.gitignore`.

### 4. Start the backend

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm start
```

The application will open in your browser at:

```text
http://localhost:3000
```

## 🔌 API Endpoint

The backend provides the following endpoint:

```text
GET /api/news
```

### Search by keyword

```text
http://localhost:5000/api/news?keyword=sri%20lanka
```

### Browse by category

```text
http://localhost:5000/api/news?category=technology
```

Supported categories include:

* Technology
* Business
* Sports
* Health
* Entertainment

## 📚 Purpose

This project was developed to gain practical experience in:

* Full-stack web development
* React development
* Node.js and Express.js
* REST API integration
* Frontend-backend communication
* Asynchronous API requests
* Environment variable management
* Software Development

## 🔐 Security

The NewsAPI key is stored in an environment variable rather than being hard-coded into the application.

The `.env` file is excluded from Git using `.gitignore`.

## 👩‍💻 Author

**Savinthi Abeygunawardena**

Software Engineering Undergraduate
LNBTI Japanese IT University
