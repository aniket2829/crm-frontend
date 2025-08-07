"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Loading } from "@/components/ui/loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, initialize } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Initialize auth state immediately
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Wait for auth to be initialized
    if (!isInitialized) {
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    } else if (isAuthenticated && pathname === "/login") {
      router.push("/");
    } else {
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
    return null;
  }

  // If authenticated and on login page, don't render anything (will redirect)
  if (isAuthenticated && pathname === "/login") {
    return null;
  }

  return <>{children}</>;
}
