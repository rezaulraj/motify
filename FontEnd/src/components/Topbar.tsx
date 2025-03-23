import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButtons from "./SignInAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75">
      <div className="flex gap-2 items-center">
        <img src="/motify.png" alt="logo" className="size-8" />
        Motify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin DashBoard
          </Link>
        )}
        {/* <SignedIn>
          <SignOutButton />
        </SignedIn> */}

        <SignedOut>
          <SignInAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
