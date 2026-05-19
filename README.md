# EcoDrive 🌍

**EcoDrive** is a premium, gamified driving telemetry and analytics platform built to help drivers monitor, evaluate, and optimize their driving habits. Think of it as **Duolingo meets vehicular telematics**—designed to make fuel savings and carbon footprint reduction competitive, engaging, and rewarding.

---

## 🚘 Why EcoDrive?

Every time you hit the brakes aggressively, speed up rapidly, or leave your engine running while parked, you burn excess fuel and release unnecessary greenhouse gases. 

By analyzing **driving telemetry** (distance, duration, acceleration, deceleration, and idling), EcoDrive grades each trip on a scale of **0 to 100**. This score guides you to build cleaner, smoother driving habits, which directly leads to:
*   **Fuel Savings**: Save up to 20-30% on fuel bills.
*   **Less Wear & Tear**: Prevent early degradation of tires and brake pads.
*   **Reduced Carbon Emissions**: Visualize exactly how many kilograms of CO2 you save from entering the atmosphere.

---

## ✨ Features

### 1. 🌌 Aesthetic Landing Page
*   An ultra-modern, minimal dark-mode landing page explaining the benefits of driving telemetry.
*   **Drivetrain Showdown**: Visual cards benchmarking the environmental footprints of electric motors, hybrid vehicles, petrol, and diesel powertrains (featuring popular vehicles like Tesla Model 3, Toyota Grand Highlander, Mahindra XUV700, and Toyota Fortuner).

### 2. 📊 Telemetry Control Dashboard
*   **Average Driving Efficiency**: Interactive dashboard displaying your overall driving grade.
*   **Dynamic Performance Trend Charts**: Visualizing weekly scores using smooth glassmorphism charts.
*   **AI Driving Insights & Recommendations**: Scans your telemetry logs to deliver personalized tips (e.g., advising you to anticipate stops if frequent hard braking is detected).

### 3. ⏱️ Simplified Telemetry Simulator
*   A simplified trip logger. Just enter the **Route Nickname**, **Distance (km)**, and **Duration (mins)**.
*   The system automatically calculates speed averages and simulates acceleration rates, braking consistency, and idling times to grade your trip.

### 4. 🏆 Leaderboard & Rankings
*   Friendly community competition. Compete against drivers globally.
*   Rankings are determined by **Total XP** earned from clean drives. Climb from *Eco-Beginner* to *Eco-Master*.

### 5. 🎖️ Badge Gallery & Achievements
*   Unlock achievements automatically as you drive (e.g., *First Trip*, *Carbon Saver*, *Eco Champion*).
*   Earning badges awards massive XP bonuses, boosting your position on the Leaderboard.

---

## 🛠️ Technology Stack

*   **Frontend**: React (TypeScript), Vite, Tailwind CSS v3, Recharts, Lucide Icons, Zustand (State Management), Axios.
*   **Backend**: Laravel 11 (PHP), Laravel Sanctum (Token-Based Auth), SQLite (Relational Database).

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   [PHP](https://www.php.net/) (v8.2+)
*   [Composer](https://getcomposer.org/)

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Create the SQLite database file:
   ```bash
   touch database/database.sqlite
   ```
5. Run database migrations and seed mockup data:
   ```bash
   php artisan migrate:fresh --seed
   ```
6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   *The backend api will run at `http://127.0.0.1:8000`.*

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `VITE_API_URL=http://localhost:8000/api/v1` matches the backend server).*
4. Start the frontend Vite server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173` (or the port specified in terminal).*

---

## 🔐 Seed Credentials

Use these seeded credentials to test the dashboard immediately:

*   **Admin User**:
    *   **Email**: `admin@ecodrive.com`
    *   **Password**: `password`
*   **Mock Driver Accounts**:
    *   **Email**: `user0@example.com` (to `user49@example.com`)
    *   **Password**: `password`
