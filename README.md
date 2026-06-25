# BozVid - Video Monetization App

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Edit `.env` with your PayPal credentials:
```
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret
PAYPAL_MODE=sandbox
```

### 3. Get PayPal Credentials
1. Visit: https://developer.paypal.com
2. Sign up/Login
3. Go to: Dashboard → Apps & Credentials
4. Create App → Copy Client ID & Secret

### 4. Run the App

**iOS (Mac only):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Development Server:**
```bash
npm start
```

## Features

✅ **Dark Theme** - Sleek dark UI with cyan accents
✅ **Video Streaming** - Browse and watch videos
✅ **Earn Rewards** - Get paid for watching
✅ **PayPal Integration** - Direct payments
✅ **Wallet Management** - Track earnings
✅ **User Profiles** - Manage account

## Project Structure
```
src/
├── components/      # UI components
├── screens/         # App screens
├── services/        # Business logic (PayPal)
├── context/         # Auth context
├── navigation/      # App navigation
├── constants/       # Theme & colors
└── App.tsx         # Entry point
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Dependencies fail | `rm -rf node_modules package-lock.json && npm install` |
| Metro won't start | `npm start -- --reset-cache` |
| iOS build fails | `cd ios && pod install && cd ..` |
| PayPal not working | Check `.env` file |

## Next Steps

- [ ] Connect to backend API
- [ ] Implement video uploads
- [ ] Add social features
- [ ] Deploy to App Store & Play Store

**Support**: Contact geo21m5@gmail.com
