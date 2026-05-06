import svg from "@/assets/svg";

export default function DashboardPage() {
  return (
    <section className="page-container min-h-(calc(100vh-var(--header-height))) grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
          Buid secure authentication <br />
          <span className="text-crimson-red">faster & smater</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          A modern authentication system with the best practices, scalability and clean
          architecture.
        </p>

        <div className="flex items-center gap-4">
          <button className="bg-crimson-red px-6 py-3 text-peach rounded-lg transition hover:-translate-y-0.5">
            Get Started
          </button>

          <button className="border border-crimson-red px-6 py-3 text-crimson-red rounded-lg transition hover:bg-crimson-red hover:text-peach">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <img src={svg.bannerA} alt="Banner" className="max-w-full h-auto object-contain" />
      </div>
    </section>
  );
}
