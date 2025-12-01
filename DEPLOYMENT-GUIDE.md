# Complete Deployment Guide: Kambaz Application
## Deploy to Vercel (Frontend) + Render (Backend) + MongoDB Atlas

---

## 📋 Prerequisites

Before starting, create accounts (all FREE):
1. **MongoDB Atlas** - https://www.mongodb.com/cloud/atlas/register
2. **Render** - https://render.com (Sign up with GitHub)
3. **Vercel** - https://vercel.com (Sign up with GitHub)
4. **GitHub** - https://github.com (if you don't have an account)

---

## PART 1: Set Up MongoDB Atlas (Database)

### Step 1.1: Create MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a FREE account
3. After logging in, click **"Build a Database"**
4. Select **"M0 FREE"** tier
5. Choose a cloud provider (AWS recommended) and region (closest to you)
6. Name your cluster **"kambaz-cluster"**
7. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 1.2: Create Database User

1. In left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `kambaz-admin`
5. Password: Click **"Autogenerate Secure Password"** → **COPY AND SAVE THIS PASSWORD**
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

### Step 1.3: Allow Network Access

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (shows `0.0.0.0/0`)
   - ⚠️ This is fine for development. For production, restrict to specific IPs.
4. Click **"Confirm"**

### Step 1.4: Get Connection String

1. In left sidebar, click **"Database"**
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://kambaz-admin:<password>@kambaz-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT:** Replace `<password>` with the password you saved in Step 1.2
7. Add database name before the `?`:
   ```
   mongodb+srv://kambaz-admin:YOUR_PASSWORD@kambaz-cluster.xxxxx.mongodb.net/kambaz?retryWrites=true&w=majority
   ```
8. **SAVE THIS FULL CONNECTION STRING** - you'll need it for Render

---

## PART 2: Deploy Backend to Render

### Step 2.1: Push Code to GitHub

1. Open terminal in your backend folder:
   ```bash
   cd "D:\NORTHEASTERN UNIVERSITY\Web Development\PROJECT\kambaz-node-server-app"
   ```

2. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: add MongoDB integration and deployment configs"
   ```

3. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `kambaz-backend`
   - Keep it **Public**
   - Click **"Create repository"**

4. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kambaz-backend.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 2.2: Deploy on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize Render
4. Find and select your **`kambaz-backend`** repository
5. Configure the service:

   **Basic Settings:**
   - Name: `kambaz-backend`
   - Region: `Oregon (US West)` (or closest to you)
   - Branch: `main`
   - Root Directory: (leave blank)
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Advanced Settings → Environment Variables:**

   Click **"Add Environment Variable"** and add these:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | (paste your MongoDB Atlas connection string from Part 1) |
   | `SESSION_SECRET` | `kambaz-secret-production-key-123` (or any random string) |
   | `SERVER_ENV` | `production` |
   | `SERVER_URL` | `.onrender.com` |
   | `CLIENT_URL` | `https://kambas-next-js.vercel.app` (we'll update this later) |
   | `PORT` | `4000` |

6. Instance Type: Select **"Free"**
7. Click **"Create Web Service"**

### Step 2.3: Wait for Deployment

1. Render will start building your app (takes 2-5 minutes)
2. Watch the logs - you should see:
   ```
   ✅ MongoDB Connected Successfully
   Your service is live 🎉
   ```
3. **COPY YOUR BACKEND URL** from the top of the page:
   ```
   https://kambaz-backend.onrender.com
   ```
4. Test it by visiting: `https://kambaz-backend.onrender.com/api/courses`
   - You should see `[]` (empty array) - this is correct!

---

## PART 3: Deploy Frontend to Vercel

### Step 3.1: Update Frontend Environment Variables

1. Open your frontend `.env.local` file:
   ```bash
   cd "D:\NORTHEASTERN UNIVERSITY\Web Development\PROJECT\kambas-next-js"
   ```

2. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_HTTP_SERVER=https://kambaz-backend.onrender.com
   CLIENT_URL=http://localhost:3000
   ```
   (Replace with YOUR Render backend URL from Step 2.3)

### Step 3.2: Push Frontend to GitHub

1. In frontend folder:
   ```bash
   git init
   git add .
   git commit -m "feat: configure production backend URL"
   ```

2. Create repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `kambas-next-js`
   - Keep it **Public**
   - Click **"Create repository"**

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kambas-next-js.git
   git branch -M main
   git push -u origin main
   ```

### Step 3.3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Click **"Add GitHub Account"** and authorize Vercel
4. Select your **`kambas-next-js`** repository
5. Click **"Import"**
6. Configure Project:

   **Framework Preset:** Next.js (auto-detected)

   **Environment Variables:**

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_HTTP_SERVER` | `https://kambaz-backend.onrender.com` |

   (Use YOUR Render backend URL)

7. Click **"Deploy"**

### Step 3.4: Get Your Frontend URL

1. Vercel will build your app (takes 1-2 minutes)
2. When complete, you'll see: **"Congratulations! Your project has been deployed."**
3. Click **"Visit"** to open your app
4. **COPY YOUR FRONTEND URL**:
   ```
   https://kambas-next-js.vercel.app
   ```
   (It might have a different suffix)

### Step 3.5: Update Backend CORS Settings

1. Go back to Render dashboard: https://dashboard.render.com
2. Click on your **kambaz-backend** service
3. Click **"Environment"** in left sidebar
4. Find **`CLIENT_URL`** variable
5. Update its value to YOUR Vercel URL:
   ```
   https://kambas-next-js.vercel.app
   ```
6. Click **"Save Changes"**
7. Render will automatically redeploy (takes 1 minute)

---

## PART 4: Seed Initial Data to MongoDB

Your database is empty! Let's add some initial data.

### Step 4.1: Create Seed Script

1. In your backend folder, create `seed.js`:
   ```bash
   cd "D:\NORTHEASTERN UNIVERSITY\Web Development\PROJECT\kambaz-node-server-app"
   ```

2. Create file: `seed.js` with this content:

```javascript
import mongoose from "mongoose";
import User from "./Kambaz/Database/models/User.js";
import Course from "./Kambaz/Database/models/Course.js";
import Enrollment from "./Kambaz/Database/models/Enrollment.js";
import "dotenv/config";

const users = [
  {
    _id: "123",
    username: "iron_man",
    password: "stark123",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    role: "FACULTY",
  },
  {
    _id: "234",
    username: "dark_knight",
    password: "wayne123",
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce@wayne.com",
    role: "STUDENT",
  },
];

const courses = [
  {
    _id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    description: "This course provides an in-depth study of rocket propulsion.",
    credits: 4,
  },
  {
    _id: "RS102",
    name: "Aerodynamics",
    number: "RS4560",
    description: "Comprehensive exploration of aerodynamics principles.",
    credits: 3,
  },
];

const enrollments = [
  { user: "123", course: "RS101" },
  { user: "234", course: "RS101" },
  { user: "123", course: "RS102" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert new data
    await User.insertMany(users);
    await Course.insertMany(courses);
    await Enrollment.insertMany(enrollments);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
```

### Step 4.2: Run Seed Script

1. Make sure MongoDB URI is in your `.env` file
2. Run the seed script:
   ```bash
   node seed.js
   ```
3. You should see:
   ```
   ✅ Connected to MongoDB
   🗑️  Cleared existing data
   ✅ Database seeded successfully!
   ```

---

## PART 5: Test Your Deployed Application

### Step 5.1: Test Backend

1. Visit: `https://YOUR-BACKEND-URL.onrender.com/api/courses`
2. You should see the list of courses
3. Visit: `https://YOUR-BACKEND-URL.onrender.com/api/users`
4. You should see the list of users

### Step 5.2: Test Frontend

1. Visit: `https://YOUR-FRONTEND-URL.vercel.app`
2. Click **"Sign In"**
3. Login with:
   - Username: `iron_man`
   - Password: `stark123`
4. You should see the Dashboard with courses!

### Step 5.3: Test Full Integration

1. Click **"All Courses"** - should show all courses
2. Click **"My Courses"** - should show enrolled courses
3. Click **"Enroll"** on a course - should enroll successfully
4. Navigate to a course → People - should show enrolled users
5. Create a new course - should appear immediately

---

## 🎉 CONGRATULATIONS!

Your application is now fully deployed:

✅ **Frontend (Vercel):** React/Next.js UI
✅ **Backend (Render):** Node.js/Express API
✅ **Database (MongoDB Atlas):** Cloud database

### Your Live URLs:
- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-backend.onrender.com`
- **MongoDB:** Cloud database managed by Atlas

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch courses"
- Check Render logs for MongoDB connection errors
- Verify MONGODB_URI is correct in Render environment variables
- Make sure MongoDB Atlas allows access from `0.0.0.0/0`

### Issue: "CORS error"
- Verify CLIENT_URL in Render matches your Vercel URL exactly
- Redeploy backend after changing CLIENT_URL

### Issue: "Cannot sign in"
- Run seed script to add users to MongoDB
- Check Render logs for session errors

### Issue: Render app is slow
- Free tier sleeps after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Subsequent requests will be fast

---

## 📝 Important Notes

1. **Free Tier Limitations:**
   - Render: Sleeps after 15 min inactivity, 750 hours/month
   - MongoDB Atlas: 512MB storage limit
   - Vercel: Unlimited static hosting

2. **Security:**
   - Never commit `.env` file to GitHub
   - Use strong SESSION_SECRET in production
   - Consider restricting MongoDB access to specific IPs

3. **Updating Your App:**
   - Push changes to GitHub
   - Vercel/Render auto-deploy on new commits

---

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

Good luck with your deployment! 🚀
