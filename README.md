# LeetTrack - DSA Preparation Platform

LeetTrack is a comprehensive DSA preparation platform that helps you track your progress and get AI-powered feedback on your solutions.

## Features

- Google Authentication
- Problem tracking and progress monitoring
- AI-powered code feedback
- Pattern detection and optimization suggestions
- Company-specific problem tracking
- Daily streak tracking

## Tech Stack

- Frontend: Next.js (App Router), TailwindCSS, TypeScript
- Backend: Next.js API Routes
- Authentication: Firebase Authentication
- Database: Firebase Firestore
- AI: Gemini 1.5 Pro (for code analysis)
- Deployment: Vercel

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/leettrack.git
   cd leettrack
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # AI API Configuration
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Set up Firebase:

   - Create a new Firebase project
   - Enable Google Authentication
   - Create a Firestore database
   - Add your Firebase configuration to `.env.local`

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard page
│   └── feedback/          # Feedback page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   └── feedback/         # Feedback components
├── contexts/             # React contexts
├── lib/                  # Utility functions and configurations
└── types/               # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
