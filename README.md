# 🏠 HouseRent

## Broker-Mediated Real Estate Platform

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** real estate platform modeled on a real-world brokerage workflow. Owners list properties, **Admin (the broker)** reviews and approves every listing, and only then can Renters book rentals or Buyers enquire about sale properties.

The application features a **modern glassmorphic UI** with an animated drifting gradient background for an attractive user experience.

---

# 📌 Roles & Workflow

```
Owner posts a property
        ↓
Admin reviews & approves/rejects
        ↓
Renter books a rental property
           OR
Buyer enquires about a sale property
```

### 👨‍💼 Owner

- Register and Login
- Add properties for Rent or Sale
- Upload property images
- Edit/Delete properties
- View booking requests
- Manage property availability

> New properties are submitted as **Pending**. If an approved property is edited, it is sent back for Admin review.

---

### 👨‍💼 Admin (Broker)

- Login only (cannot self-register)
- Approve or Reject property listings
- Grant/Ungrant owner accounts
- View all users
- View all properties
- View all bookings
- Manage the complete platform

---

### 🏠 Renter / Buyer

- Register and Login
- Browse approved properties
- Search and filter properties
- Book rental properties
- Enquire about sale properties
- View booking history

---

# ✨ Features

- Public home page with featured property carousel
- Property search using:
  - Location
  - Address
  - Property Type
  - Rent / Sale
  - Price Range
- Rent and Sale property support
- JWT Authentication
- Role-Based Login
- Owner Dashboard
- Renter Dashboard
- Admin Dashboard
- Property Approval Workflow
- Booking Management
- Owner Account Approval
- Property Image Upload
- Responsive Dark Glassmorphism UI
- Animated Background

---

# 🛠 Technologies Used

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer

## Database

- MongoDB
- Mongoose

---

# 📁 Project Structure

```
HouseRent/
│
├── client/      → React + Vite + Tailwind CSS
├── server/      → Express + MongoDB (Mongoose)
├── PHASEWISE DOCUMENTATION/
├── README.md
└── .gitignore
```

---

# ⚙ Installation Guide

## Step 1: Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Step 2: Backend Setup

Open another terminal.

```bash
cd server
npm install
npx nodemon index.js
```
shows:

```
running on port:8000
and ✅mongodb connected
```

---

## Step 3: Configure Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```env
MONGO_URI=mongodb://localhost:27017/HouseRent
JWT_SECRET=houserent_super_secret_change_me
PORT=8000
```

---

## Step 4: Start Backend Server

```bash
nodemon index.js
```

Runs on:

```
http://localhost:8000
```

---

# 👨‍💼 Creating Admin Accounts

Registration only allows **Owner** and **Renter** roles.

Admin accounts cannot be created through registration.

Create default admin accounts using:

```bash
cd server
npm run seed
```

Default Accounts

```
admin1@houserent.com
Password: Admin@123

admin2@houserent.com
Password: Admin@456
```

You can add more admin accounts by editing:

```
server/seed.js
```

---

# 📂 Documentation

The repository includes complete project documentation inside the **PHASEWISE DOCUMENTATION** folder.

Documentation includes:

- Requirement Analysis
- Brainstorming & Ideation
- Project Planning
- Project Design
- Project Development
- Final Project Documentation

---

# 🎥 Demo Video

**Google Drive Demo:**

https://drive.google.com/file/d/1rW67_Q6fhhDazjiIrcXiGNcpeQgSgNBC/view?usp=sharing

---

# 📝 Notes

- Uploaded property images are stored in **server/uploads**.
- New Owner accounts are created as **Not Granted** until approved by Admin.
- New Property listings remain **Pending** until approved by Admin.
- Renters can only view **Approved** properties.
- Booking requests begin with **Pending** status.
- Owners/Admins can change booking status between **Pending** and **Booked** (or **Sold** for sale properties).

---

# 🚀 Future Enhancements

- Google Maps Integration
- Property Reviews & Ratings
- Chat Between Owner & Renter
- PDF Booking Receipt
- Real-time Notifications
- Dark / Light Theme
- Advanced Property Search
- Fully Responsive Mobile UI

---

# 👩‍💻 Developed By

**RAGA PRIYA ISWARYA YASALAPU(TEAM MEMBER) && PRAVEEN KUMAR PENUGONDA(TEAM LEADER) OF HOUSERENT PROJECT**

**B.Tech – Computer Science & Engineering**

**Rajahmundry Institute of Engineering & Technology (RIET)**

---

# 📜 License

This project was developed for educational and internship purposes.
