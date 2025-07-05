 Minimal Library Management System 📚

A clean, functional, and minimal library management system built with React, TypeScript, and Redux Toolkit Query. This client-side application interacts with a RESTful API to perform CRUD operations on books, manage borrowing, and display summaries.

## 🚀 Live Links

- **Frontend:** **[https://your-frontend-deployment-link.vercel.app](https://your-frontend-deployment-link.vercel.app)**
- **Backend:** **[https://your-backend-api-link.vercel.app](https://your-backend-api-link.vercel.app)**

---

## ✨ Key Features

- **Full CRUD Functionality:** Create, Read, Update, and Delete books with a seamless user interface.
- **Modern UI/UX:** A minimalist and fully responsive design built with Tailwind CSS, ensuring a great experience on any device.
- **Interactive Book List:** View all books in a modern, responsive card layout.
- **Dedicated Detail Pages:** Click on any book to see its detailed information, including description, ISBN, and available copies.
- **Separate Management Pages:** Clean, dedicated pages for adding a new book and editing an existing one.
- **Efficient State Management:** All API interactions and server state are managed efficiently using RTK Query.
- **Borrowing System:** A simple interface to borrow books and view a detailed history of all borrowed items.
- **Enhanced User Experience:** Features like toast notifications for actions and elegant confirmation dialogs using SweetAlert2.

---

## 🛠️ Technology Stack

| Layer | Technology |
| ----------------- | ---------------------------------------------------------- |
| **Frontend** | React, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **State Management**| Redux Toolkit, RTK Query |
| **Form Handling** | React Hook Form, Zod |
| **Notifications** | Sonner / React Hot Toast, SweetAlert2 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |



---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or a cloud instance like MongoDB Atlas)

### Local Setup

1. **Clone the repository:**
   ```sh
   git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPO_NAME].git
   cd [YOUR_REPO_NAME]
Backend Setup:

Bash

cd server  # Or your backend folder name
npm install
Create a .env file in the backend's root directory.

Add the following environment variables:

Code snippet

PORT=5000
DATABASE_URL=your_mongodb_connection_string
Run the backend server:

Bash

npm run dev
Frontend Setup:

Bash

cd client  # Or your frontend folder name
npm install
Create a .env.local file in the frontend's root directory.

Add the following environment variable pointing to your backend API:

Code snippet

VITE_API_BASE_URL=http://localhost:5000/api/v1
Run the frontend development server:

Bash

npm run dev
Open http://localhost:5173 (or your specified port) in your browser to see the application.
