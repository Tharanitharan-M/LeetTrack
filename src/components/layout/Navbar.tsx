"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface NavbarProps {
  showLogo?: boolean;
}

export default function Navbar({ showLogo = true }: NavbarProps) {
  const { user, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo (conditionally rendered) */}
        {showLogo ? (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}> 
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Leet</span><span className="text-blue-500">Track</span>
            </span>
          </div>
        ) : <div />}
        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Avatar>
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md shadow-lg"
                onClick={signOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-lg"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
} 