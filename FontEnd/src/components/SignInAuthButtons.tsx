import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  // Only render if the sign-in component is loaded
  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", // Customize redirect URL after sign-in
      redirectUrlComplete: "/auth-callback", // Optional: URL after successful sign-in
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="w-full text-white border-zinc-200 h-11"
    >
      Continue With Google
    </Button>
  );
};

export default SignInAuthButtons;
