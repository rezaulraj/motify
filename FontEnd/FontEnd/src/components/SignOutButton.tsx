import { useClerk } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="secondary"
      className="w-full text-white border-zinc-200 h-11"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
