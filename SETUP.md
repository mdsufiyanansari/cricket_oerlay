# 📋 Complete Setup Guide - Cricket Live Overlay

This guide will walk you through setting up the Cricket Live Overlay application from scratch.

## Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 16.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For version control ([Download](https://git-scm.com/))
- **OBS Studio**: For streaming (optional, [Download](https://obsproject.com/))

Verify installation:
```bash
node --version
npm --version
```

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `cricket-overlay` (or your choice)
4. Continue through setup
5. Enable Google Analytics (optional)
6. Click "Create project"

### 1.2 Setup Realtime Database

1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click **Create Database**
3. Select region closest to you
4. Start in **Test mode** (for development)
5. Click **Enable**

### 1.3 Setup Cloud Storage

1. Go to **Build** → **Storage**
2. Click **Get Started**
3. Review security rules (keep test mode for now)
4. Click **Done**

### 1.4 Get Credentials

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the Web icon (</>) if no app exists
4. Register app as "Cricket Overlay"
5. Copy the entire config object

## Step 2: Project Setup

### 2.1 Clone/Navigate to Project

```bash
cd cricket-overlay
```

### 2.2 Install Dependencies

```bash
npm install
```

This will install:
- react (UI framework)
- react-dom (DOM rendering)
- react-router-dom (navigation)
- tailwindcss (styling)
- framer-motion (animations)
- firebase (backend)
- react-icons (icons)

### 2.3 Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_from_firebase
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 3: Running the Application

### 3.1 Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v8.x.x  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### 3.2 Access the Application

Open your browser and go to: **http://localhost:5173/**

You'll see the Login page. For demo purposes, enter any email and password.

## Step 4: Creating Your First Match

### 4.1 Navigate to Match Setup

1. Click the **"New Match"** card on the dashboard
2. Or go directly to: http://localhost:5173/match

### 4.2 Configure Teams

**Step 1 - Team Setup:**
- Enter Team 1 name (e.g., "Mumbai Indians")
- Upload Team 1 logo (PNG/JPG)
- Enter Team 2 name (e.g., "Chennai Super Kings")
- Upload Team 2 logo

**Step 2 - Match Details:**
- Enter venue name
- Select date and time
- Choose match format (T5, T10, T20, ODI)

**Step 3 - Review:**
- Review all details
- Click "Create Match"

### 4.3 Start Scoring

1. Go to Admin Panel: http://localhost:5173/admin
2. Use the Ball Control buttons:
   - Press number buttons for runs (0, 1, 2, 3, 4, 6)
   - Press WICKET for dismissals
   - Press WIDE for wide balls
   - Press NO BALL for no balls
   - Press BYE/LEG BYE for byes
   - Press UNDO to correct mistakes

3. The overlay will update in real-time

## Step 5: OBS Setup (For Streaming)

### 5.1 Open OBS Studio

1. Launch OBS Studio
2. Create a new scene (or use existing)
3. Create a new source

### 5.2 Add Browser Source

1. Click **+ button** in Sources
2. Select **Browser**
3. Create new source called "Cricket Overlay"
4. Click OK

### 5.3 Configure Browser Source

In the settings dialog:

| Setting | Value |
|---------|-------|
| URL | `http://localhost:5173/overlay` |
| Width | 1920 |
| Height | 1080 |
| FPS | 60 |
| Shutdown when not visible | ✓ (optional) |
| Custom CSS | (leave blank) |

### 5.4 Test the Overlay

1. Make sure the app is running (`npm run dev`)
2. In OBS, you should see the overlay appear
3. Go to Admin Panel and score a few runs
4. You should see updates in real-time on the overlay

## Step 6: Production Deployment

### 6.1 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### 6.2 Preview Production Build

```bash
npm run preview
```

### 6.3 Deploy Options

#### Option A: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Option B: Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase deploy
```

#### Option C: Manual Server
Copy `dist/` folder to your web server.

## Troubleshooting

### Firebase Connection Issues

**Problem**: "Failed to connect to Firebase"

**Solution**:
1. Check `.env.local` credentials
2. Verify Firebase project is active
3. Check internet connection
4. Try restarting dev server

### Overlay Not Updating

**Problem**: "OBS overlay shows but doesn't update"

**Solution**:
1. Check if Admin Panel is open on localhost:5173/admin
2. Verify Firebase Realtime Database has data
3. Refresh the OBS browser source
4. Check browser console for errors (F12)

### Images Not Loading

**Problem**: "Team logos/player images don't show"

**Solution**:
1. Check file size (keep under 5MB)
2. Verify supported format (PNG, JPG, WebP)
3. Check Firebase Storage permissions
4. Try uploading again

### Performance Issues

**Problem**: "Animations are laggy"

**Solution**:
1. Close other CPU-intensive apps
2. Reduce animation effects in Settings
3. Check GPU acceleration in browser
4. Clear browser cache

## Settings Customization

Navigate to Settings page to customize:
- **Theme**: Dark/Light/System
- **Animations**: Toggle effects
- **Sound**: Enable/disable audio feedback
- **OBS Mode**: Optimize for streaming
- **Resolution**: Set OBS canvas size

## Database Structure

Your Firebase Realtime Database will look like:

```
cricket-overlay-db/
└── match/
    └── live/
        ├── team1/
        │   ├── name: "Mumbai Indians"
        │   ├── logo: "url"
        │   ├── score: 156
        │   ├── wickets: 4
        │   ├── overs: 18
        │   └── balls: 3
        ├── team2/ (similar structure)
        ├── batsman/
        │   ├── name: "Virat Kohli"
        │   ├── runs: 42
        │   └── balls: 35
        ├── bowler/
        │   ├── name: "Jasprit Bumrah"
        │   ├── overs: 4
        │   └── wickets: 2
        ├── partnership/
        │   ├── runs: 89
        │   └── balls: 67
        └── recentBalls: [...]
```

## Keyboard Reference (Planned)

| Key | Action |
|-----|--------|
| `1` | Single run |
| `2` | Two runs |
| `4` | Four runs |
| `6` | Six runs |
| `W` | Wicket |
| `Z` | Undo |

## Tips & Best Practices

1. **Always backup your Firebase data** - Set up automated backups
2. **Test before streaming** - Verify everything works locally first
3. **Use high-quality logos** - They'll display large on stream
4. **Keep admin panel always on** - Separate monitor/device recommended
5. **Test OBS scene** - Verify overlay doesn't overlap other content

## Getting Help

- Check [Firebase Docs](https://firebase.google.com/docs)
- Review [React Documentation](https://react.dev)
- Check [OBS Help](https://obsproject.com/help)
- Raise GitHub issues with details

## Security for Production

1. **Enable Authentication**: Add admin login via Firebase Auth
2. **Set Database Rules**: Restrict write access
3. **Set Storage Rules**: Protect media files
4. **Use HTTPS**: Always encrypt data in transit
5. **Environment Secrets**: Never commit .env files

## Next Steps

1. ✅ Complete this setup
2. 📊 Configure your first match
3. 🎬 Test with OBS
4. 📤 Deploy to production
5. 🏏 Start streaming!

---

**Need more help?** Open an issue or check the main README.md

**Happy streaming!** 🎉
