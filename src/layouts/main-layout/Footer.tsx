import images from "@/assets/images";
import { footerData, socialLinks } from "@/shared/config/footer.data";
import { Copyright } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-crimson-red rounded-t-md pt-1 px-1 shadow-[0_-6px_30px_rgba(0,0,0,0.2)]">
      <div className="page-container bg-peach text-crimson-red rounded-t-md py-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/">
            <img src={images.logo} alt="Gif" />
          </Link>

          {footerData.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-xl font-semibold">{column.title}</h3>

              <ul className="space-y-3">
                {column.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label}>
                      <Link to={item.to} className="flex items-center gap-1 gently-emerge">
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-6 border-t border-crimson-red/30" />
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
