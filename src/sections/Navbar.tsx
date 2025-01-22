import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-gray-600 px-3 py-2">
      <div className="cursor-pointer font-youth text-2xl font-semibold text-accent transition-colors hover:text-accent-hover md:text-2xl">
        Deventra
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-accent text-white hover:bg-accent-hover">
          Connect your wallet
        </Button>

        <div className="hidden">
          <img src="/src/assets/header/avatar.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
