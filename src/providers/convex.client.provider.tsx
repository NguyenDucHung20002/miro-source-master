"use client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import LoadingAuth from "@/components/auth/loading.auth";

interface IConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convexClientKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({
  children,
}: IConvexClientProviderProps) {
  return (
    <ClerkProvider publishableKey={convexClientKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <LoadingAuth></LoadingAuth>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
