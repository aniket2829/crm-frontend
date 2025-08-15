"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Loading } from "@/components/ui/loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, initialize, autoLogin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Initialize auth state immediately
    initialize();
    
    // Auto-login for development (remove this in production)
    if (process.env.NODE_ENV === 'development') {
      autoLogin();
    }
  }, [initialize, autoLogin]);

  useEffect(() => {
    console.log('AuthGuard state:', { isAuthenticated, isInitialized, pathname })
    
    // Wait for auth to be initialized
    if (!isInitialized) {
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated && pathname !== "/login") {
      console.log('Redirecting to login - not authenticated')
      router.push("/login");
    } else if (isAuthenticated && pathname === "/login") {
      console.log('Redirecting to dashboard - already authenticated')
      router.push("/");
    } else {
      console.log('Setting loading to false')
      setIsLoading(false);
    }
    
    setHasCheckedAuth(true);
  }, [isAuthenticated, isInitialized, pathname, router]);

  // Show loading while checking authentication
  if (!isInitialized || isLoading || !hasCheckedAuth) {
    return <Loading />;
  }

  // If not authenticated and not on login page, don't render anything
  if (!isAuthenticated && pathname !== "/login") {
    console.log('Not rendering - not authenticated and not on login page')
    return null;
  }

  // If authenticated and on login page, don't render anything (will redirect)
  if (isAuthenticated && pathname === "/login") {
    console.log('Not rendering - authenticated and on login page')
    return null;
  }

  console.log('Rendering children')
  return <>{children}</>;
}
