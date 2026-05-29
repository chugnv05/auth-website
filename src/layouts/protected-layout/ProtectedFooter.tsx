import { socialLinks } from "@/shared/config/footer.data";
import { Copyright } from "lucide-react";

export default function ProtectedFooter() {
  return (
    <footer className="bg-crimson-red rounded-t-md pt-1 px-1 shadow-[0_-6px_30px_rgba(0,0,0,0.2)]">
      <div className="page-container bg-peach text-crimson-red rounded-t-md py-4">
        <div className="mb-6 border-t border-crimson-red/30" />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="flex items-center gap-1 text-sm opacity-80">
            <Copyright /> {new Date().getFullYear()} Auth Website. All rights reserved.
          </div>

          <div className="flex justify-start md:justify-end gap-5 text-2xl">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <a key={index} href={item.to} target="_blank" rel="noopener noreferrer">
                  <Icon className="gently-emerge" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
