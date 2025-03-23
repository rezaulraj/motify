import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between sticky top-0 z-50 bg-neutral-900 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="rounded-lg">
          <img src="/motify.png" alt="" className="size-10 text-black" />
        </Link>
        <div className="">
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
