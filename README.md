# House Rent — Broker-Mediated Real Estate Platform

A full MERN-stack real estate platform modeled on a real-world brokerage workflow: Owners list
properties, Admin (the broker) reviews and approves every listing, and only then can Renters book
rentals or Buyers enquire about sale properties. Dark, glassmorphic UI with an animated, drifting
gradient + particle background.

## Roles & Workflow

```
Owner posts a property  →  Admin reviews & approves/rejects  →  Renter books (rent) or
                                                                  Buyer enquires (sale)
```

- **Owner** — registers, lists properties (Rent or Sale). New listings start as `pending`. Editing an
  already-approved listing sends it back to `pending` for re-review.
- **Admin** — the only role that can approve/reject listings, grant/ungrant owner accounts, and see
  everything (all users, all properties regardless of status, all bookings). **Admin cannot be
  self-registered** — see below.
- **Renter** — registers, browses only `approved` + available properties, can request a Rent booking
  or submit a Sale enquiry, and tracks status under Booking History.

## Features

- Public home page with rotating hero carousel and featured listings
- Property search with **location, address, property type, rent/sale, and price range filters**
- Supports both **Rent** and **Sale** listings, with rent/sale-aware copy throughout ("Get Info / Book"
  vs "Enquire to Buy", "Mark Booked" vs "Mark Sold", etc.)
- Auth: register (**Renter / Owner only**) & login, JWT-based sessions
- **Owner dashboard**: Add Property (image upload, location field), All Properties (review status,
  availability toggle, delete), All Bookings (mark pending/booked or sold)
- **Renter dashboard**: browse & filter approved properties, request a booking/enquiry, Booking
  History with live status
- **Admin dashboard**: All Users (grant/ungrant owners, delete users), All Properties (Approve/Reject
  with a status filter and pending-count badge), All Bookings (full audit view)
- Property details page shows a rejection reason to the owner, and a "pending review" notice
- Responsive, animated dark UI (Tailwind CSS) with a unique flowing gradient + particle background

## Project Structure

```
HouseRent/
├── client/   → React 18 + Vite + Tailwind CSS frontend
└── server/   → Express + MongoDB (Mongoose) backend
```

## Step 1: Set Up the Frontend (React App)

```bash
cd client
npm install
npm run dev
```

The app runs on **http://localhost:5173** (API calls are proxied to the backend automatically).

## Step 2: Set Up the Backend (Express Server)

Open a new terminal tab/window:

```bash
cd server
npm install
```

## Step 3: Configure Environment Variables

Inside `server/`, create a `.env` file (a `.env.example` is provided as a template):

```
MONGO_URI=mongodb://localhost:27017/HouseRent
JWT_SECRET=houserent_super_secret_change_me
PORT=8000
```

## Step 4: Start the Backend Server

```bash
nodemon index.js
```

The server runs on **http://localhost:8000**.

## Creating Admin Accounts

Registration (both UI and API) only accepts `renter` and `owner` — this is enforced on the
backend too, not just hidden in the dropdown, so nobody can create an admin account by calling
the API directly. Admins are created with real database access, via the seed script, which
creates **two** admin accounts by default so more than one person can monitor/broker the platform:

```bash
cd server
npm run seed
```

This creates:
- `admin1@houserent.com` / `Admin@123`
- `admin2@houserent.com` / `Admin@456`

Log in with either to reach `/admin`. To add more admins later, add another entry to the `ADMINS`
array in `server/seed.js` and run `npm run seed` again — it skips any email that already exists.

## Notes

- Uploaded property images are stored in `server/uploads` and served at `/uploads/<filename>`.
- New Owner accounts start as **not granted**; use the Admin → All Users tab to grant them.
  (This is separate from property approval — it's a broader "is this a trustworthy owner" flag.)
- New properties start as `pending` and are invisible on the public/renter browse page until an
  Admin approves them from Admin → All Properties.
- Bookings/enquiries start as `pending`; Owners/Admins can flip status between `pending` and
  `booked` (labeled "sold" for Sale properties).
