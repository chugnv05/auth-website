import svg from "@/assets/svg";
import { Button } from "@/shared/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { BadgeInfo, BadgeQuestionMark, House, PanelRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="md:hidden text-lg">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="panel" size="icon">
            <PanelRight />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="px-2 bg-peach text-crimson-red rounded-lg">
          <div className="flex flex-col gap-4 mt-5 text-peach">
            <Link to="/">
              <img src={svg.textLogoCrimsonRed} alt="Logo" />
            </Link>
            <div className="flex items-center gap-1 bg-crimson-red p-2 rounded-xl gently-emerge">
              <House />
              <Link to="/">Home</Link>
            </div>
            <div className="flex items-center gap-1 bg-crimson-red p-2 rounded-xl gently-emerge">
              <BadgeInfo />
              <Link to="/about">About us</Link>
            </div>
            <div className="flex items-center gap-1 bg-crimson-red p-2 rounded-xl gently-emerge">
              <BadgeQuestionMark />
              <Link to="/qa">Q&A</Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
