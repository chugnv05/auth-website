import svg from "@/assets/svg";
import { navMobileItems } from "@/shared/config/nav.data";
import { Button } from "@/shared/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/Sheet";
import { PanelRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="md:hidden text-lg">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="menu" size="icon">
            <PanelRight />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="px-2 bg-peach text-crimson-red rounded-lg">
          <div className="flex flex-col gap-4 mt-5 text-peach">
            <Link to="/">
              <img
                src={svg.textLogoCrimsonRed}
                className="h-[90%] w-auto object-contain"
                alt="Logo"
              />
            </Link>

            {navMobileItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-1 bg-crimson-red p-2 rounded-xl gently-emerge"
                >
                  {Icon && <Icon />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
