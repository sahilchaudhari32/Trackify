# 🚀 Trackify — Smart Personal Finance Tracker

💸 AI-powered personal finance tracking with auto-categorization, insights, and budget optimization.

# 📸 Preview
  <p align="center"> <img src="https://github.com/user-attachments/assets/311df25a-6d48-4716-ac2a-a0554cfdc8e3" width="260"/> <img src="https://github.com/user-attachments/assets/f881f789-649f-4d8d-80ff-848be79ee093" width="260"/> <img src="https://github.com/user-attachments/assets/c0142141-4807-4a88-9ac9-67462669a4db" width="260"/> </p> <p align="center"> <img src="https://github.com/user-attachments/assets/c96f4bdb-3852-4135-8b13-69e2ca436cd7" width="260"/> <img src="https://github.com/user-attachments/assets/fe928de7-40b4-450e-97bf-1e2d68c6e38a" width="260"/> </p>
  
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
