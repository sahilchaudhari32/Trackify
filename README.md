# 🚀 Trackify — Smart Personal Finance Tracker

💸 AI-powered personal finance tracking with auto-categorization, insights, and budget optimization.

# 📸 Preview
  <p align="center"> <img width="260" alt="image" src="https://github.com/user-attachments/assets/7b2b101e-7dcb-4ddf-8145-d293ff5a6096" />  <img width="260" alt="image" src="https://github.com/user-attachments/assets/451668c6-652b-4708-abd1-b2cbd05a39e8" /> <img width="260" alt="image" src="https://github.com/user-attachments/assets/fe873c00-4241-4f24-a9f0-826797a8f0f1" />   <img width="260" alt="image" src="https://github.com/user-attachments/assets/d184b790-2ec7-4641-911a-10039871238c" />  <img width="260" alt="image" src="https://github.com/user-attachments/assets/f71d8ca5-0aa2-4910-a300-57ba0a2e1d30" /> </p>

# Figma
<p>https://www.figma.com/design/mL6dUy1LChEoxXhzQCWalK/Untitled?node-id=9-44&t=EM2xfK9bRmjCUucM-1</p>

# 🧠 Overview

Trackify is a modern personal finance tracking application that helps users:

Track income & expenses
Automatically categorize transactions
Analyze spending behavior
Optimize budgets using smart insights

Built with a clean dark fintech UI, Trackify provides a premium dashboard experience similar to high-end financial platforms.

# ✨ Features
### 📊 Dashboard
- Total balance overview
- Income vs expenses breakdown
- Weekly/monthly analytics
- Smart savings suggestions
### 💳 Transactions
- View recent transactions
- Categorized spending (Food, Travel, Shopping, etc.)
- Income & expense tracking
- Clean activity timeline
### 📈 Analytics
- Net worth trends
- Expense allocation (pie chart)
- AI-generated financial insights
- Spending behavior analysis
### 💰 Budget Management
- Category-wise budget tracking
- Overspending alerts
- Progress indicators
- Smart forecasts
### 🔗 Financial Connections
- Link bank accounts (future scope)
- Portfolio tracking
- Subscription monitoring
- Security & privacy insights
# 🛠️ Tech Stack
### Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 📊 Chart Libraries (Recharts / Chart.js)
### Backend
- 🟢 Node.js
- 🚀 Express.js
### Database
- 🍃 MongoDB Atlas
# Future Integrations
- 🔌 Account Aggregator APIs (India)
- 📱 SMS parsing (UPI transactions)
- 🤖 AI/ML for smart categorization
# 📂 Project Structure
- trackify/
- │── frontend/
- │   ├── components/
- │   ├── pages/
- │   ├── assets/
- │
- │── backend/
- │   ├── controllers/
- │   ├── routes/
- │   ├── models/
- │   ├── middleware/
- │
- │── README.md
# ⚙️ Installation & Setup
### 1️⃣ Clone Repository
- git clone https://github.com/sahilchaudhari32/Trackify.git
- cd trackify
### 2️⃣ Setup Backend
- cd backend
- npm install
- npm run dev
### 3️⃣ Setup Frontend
- cd frontend
- npm install
- npm run dev
# 🔐 Environment Variables

- Create a .env file in backend:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
### 📊 Sample API Endpoints
+ Get Transactions
+ GET /api/transactions
+ Add Transaction
+ POST /api/transactions
+ Get Analytics
+ GET /api/analytics
***🧾 Sample Data***
{
  "amount": 500,
  "type": "expense",
  "category": "Food",
  "merchant": "Swiggy",
  "date": "2026-04-01"
}
### 🤖 AI Features (Planned / Advanced)
- Smart expense categorization
- Subscription detection
- Financial health score
- Predictive expense analysis
- Personalized saving recommendations
# 🎯 Roadmap
 - UI Design (Dark FinTech Dashboard)
 - Core Dashboard
 - Transactions Module
 - CSV Upload (MVP)
 - Auto Categorization Engine
 - AI Insights Engine
 - Bank API Integration
### 💡 Unique Selling Points
- Premium UI/UX (FinTech-grade)
- AI-powered insights
- Budget optimization suggestions
- Real-time financial analytics
### 📌 Use Cases
- Personal expense tracking
- Budget planning
- Financial habit improvement
- Monthly spending analysis
### 🛡️ Security
- JWT Authentication
- Encrypted data handling (planned)
- Secure API architecture
## 👨‍💻 Author

Sahil Chaudhari

- 💼 Full Stack Developer
- 🚀 Building AI-powered products
