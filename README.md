# Web-Based AI-Powered Crop Disease Detection System (Front-end)

This repository contains the front-end source code for the "Web-Based AI-Powered Crop Disease Detection System Specialized For Coconut Plants." This application provides a modern, intuitive user interface for farmers, merchants, and administrators to interact with the intelligent agricultural platform.

It is built using **React.js** and **TypeScript**, communicating with a dedicated Node.js backend and an AI microservice for real-time disease diagnosis.

## 🌟 Key Features

* **Role-Based Access Control:** Distinct interfaces and dashboards for Farmers, Merchants, and Administrators.
* **AI Disease Diagnosis UI:** User-friendly image upload interface that displays instant results with confidence scores returned from the AI model.
* **Real-Time Chat:** Integrated messaging system using Socket.io to connect farmers with agricultural experts and merchants.
* **Community Feed:** A collaborative space for users to share posts, ask questions, and share agricultural knowledge.
* **Marketplace:** A platform for merchants to list products and farmers to browse and purchase agricultural supplies.
* **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

* **Core Library:** React.js
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Routing:** React Router
* **UI Framework:** Tailwind CSS (with headless UI components)
* **API Client:** Axios
* **Real-Time Communication:** Socket.io-client
* **Build Tool:** Vite (or Create React App, update as necessary)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* npm (comes with Node) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/DhanushkaTA/ai-coconut-disease-detection-front-end.git
cd ai-coconut-disease-detection-front-end

```

### 2. Install Dependencies

Using npm:

```bash
npm install

```

Or using yarn:

```bash
yarn install

```

### 3. Environment Configuration

This application requires connection to a running instance of the backend server. Create a `.env` file in the root directory and add the following variables. Replace the URLs with your local or deployed backend service URLs.

```env
# .env file

# The base URL for the Node.js Backend API
REACT_APP_API_BASE_URL=http://localhost:5000/api

# The URL for the Socket.io server
REACT_APP_SOCKET_SERVER_URL=http://localhost:5000

```

*Note: In production, these should point to the domain where your backend is hosted.*

### 4. Run the Application

Start the development server.

Using npm:

```bash
npm start

```

Or using yarn:

```bash
yarn start

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or the port specified in the console) to view it in your browser.

## 🏗️ Project Structure

A brief overview of the directory structure:

```text
src/
├── assets/         # Static assets (images, logos, icons)
├── components/     # Reusable UI components (Buttons, Inputs, Modals)
├── contexts/       # React Contexts for global state (e.g., Auth)
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts (AdminLayout, UserLayout)
├── pages/          # Full page components (Home, Dashboard, Chat)
├── services/       # API service functions using Axios
├── store/          # Redux store configuration and slices
├── utils/          # Helper functions and constants
├── App.tsx         # Main App component and routing
└── main.tsx        # Application entry point

```

## 🔗 Related Repositories

This front-end application requires the backend services to be fully functional. You can find the related repositories here:

* **Backend (Node.js/Express):** `[Insert Link Here]`
* **AI Microservice (Python/PyTorch):** `[Insert Link Here]`

## 👨‍💻 Contributors

* **Tharindu Dhanushka Abeywickrama** - *Initial work* - [DhanushkaTA](https://github.com/DhanushkaTA)

---

© 2024 Dhanushka Abeywickrama. All Rights Reserved.