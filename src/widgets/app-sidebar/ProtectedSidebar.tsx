import { PATHS } from "@/app/router/paths";
import svg from "@/shared/assets/svg";
import { sidebarData } from "@/shared/config/sidebar.data";
import { cn } from "@/shared/lib/utils";
import { ChevronDown, ChevronRight, PanelLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function ProtectedSidebar({ isOpen, onToggle }: SidebarProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-crimson-red shrink-0 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "h-screen sticky top-0",
        isOpen ? "w-(--sidebar-width)" : "w-14",
      )}
    >
      {/* Logo va Panel */}
      <div className="flex h-(--header-height) items-center justify-between px-3 shrink-0">
        {/* an logo khi sidebar close */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isOpen ? "w-auto opacity-100" : "w-0 opacity-0",
          )}
        >
          <Link to={PATHS.HOME}>
            <img
              src={svg.peachLogo}
              className="h-(--header-height) w-auto object-contain"
              alt="Logo"
            />
          </Link>
        </div>

        {/* button panel */}
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center justify-center rounded-md p-2 shrink-0",
            "text-peach hover:bg-crimson-red transition-colors duration-200",
            !isOpen && "mx-auto", // khi close thi can giua
          )}
        >
          <PanelLeft className="size-5" />
        </button>
      </div>

      {/* ke ngang */}
      <div className="mx-3 h-px bg-peach/40" />

      <nav className="flex flex-col py-2 overflow-y-auto flex-1">
        {sidebarData.map((column, index) => {
          const Icon = column.icon as React.ComponentType<{ className?: string }>;
          const isExpanded = openItems[column.title] ?? false;
          const hasChildren = column.items && column.items.length > 0;

          return (
            <div key={column.title}>
              {/* item cha */}
              {hasChildren ? (
                <button
                  onClick={() => toggleItem(column.title)}
                  className={cn(
                    "flex w-full items-center px-3 py-2.5",
                    "text-peach hover:bg-crimson transition-colors duration-200",
                    "cursor-pointer",
                    isOpen ? "gap-3 justify-start" : "gap-0 justify-center",
                  )}
                >
                  <span className="shrink-0">{Icon && <Icon className="size-5" />}</span>
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium whitespace-nowrap overflow-hidden">
                        {column.title}
                      </span>
                      <span className="shrink-0 text-peach/70">
                        {isExpanded ? (
                          <ChevronDown className="size-4" />
                        ) : (
                          <ChevronRight className="size-4" />
                        )}
                      </span>
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={column.to}
                  className={cn(
                    "flex w-full items-center px-3 py-2.5",
                    "text-peach hover:bg-crimson transition-colors duration-200",
                    isOpen ? "gap-3 justify-start" : "gap-0 justify-center",
                  )}
                >
                  <span className="shrink-0">{Icon && <Icon className="size-5" />}</span>
                  {isOpen && (
                    <span className="flex-1 text-left text-sm font-medium whitespace-nowrap overflow-hidden">
                      {column.title}
                    </span>
                  )}
                </Link>
              )}
              {/* item con - chi hien khi sidebar mo */}
              {hasChildren && isOpen && isExpanded && (
                <div className="flex flex-col">
                  {column.items!.map((chid, childIndex) => (
                    <div key={chid.label}>
                      <div className="flex items-stretch">
                        <div className="flex flex-col items-center ml-6 mr-2 w-4 shrink-0">
                          <div className="w-px flex-1 bg-peach/20" />
                        </div>
                        <Link
                          to={chid.to}
                          className={cn(
                            "flex-1 p-2 text-sm text-peach/80",
                            "hover:text-peach hover:bg-crimson transition-colors duration-200",
                            "rounded-md",
                          )}
                        >
                          {chid.label}
                        </Link>
                      </div>
                      {/* Ke doc giua cac item con tru item cuoi */}
                      {childIndex < column.items!.length - 1 && (
                        <div className="flex items-stretch">
                          <div className="flex flex-col items-center ml-6 mr-2 w-4 shrink-0">
                            <div className="w-px h-px bg-peach/20" />
                          </div>
                          <div className="flex-1 h-px bg-peach/20 mx-1" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Ke doc giua cac item cha tru item cuoi */}
              {index < sidebarData.length - 1 && (
                <div className="flex justify-center my-1 px-3">
                  <div className="w-px h-4 bg-peach/40" />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
