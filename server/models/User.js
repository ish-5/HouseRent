const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["renter", "owner", "admin"],
      default: "renter",
    },
    // All roles this account can log in as. A single email can hold both
    // "owner" and "renter" (added to the same account when the password
    // matches), but never "admin" (admins are never self-registered).
    roles: {
      type: [{ type: String, enum: ["renter", "owner", "admin"] }],
      default: function () {
        return [this.userType];
      },
    },
    // Owners must be "granted" by an admin before their listings become bookable/visible with full details
    granted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
