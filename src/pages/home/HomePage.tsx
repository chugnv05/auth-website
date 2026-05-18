import svg from "@/shared/assets/svg";
import { Button } from "@/shared/ui";

export default function HomePage() {
  return (
    <section className="page-container min-h-(calc(100vh-var(--header-height))) grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
          Build secure authentication <br />
          <span className="text-crimson-red">faster & smarter</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          A modern authentication system with the best practices, scalability and clean
          architecture.
        </p>

        <div className="flex items-center gap-4">
          <Button variant="getStarted" size="lg">
            Get Started
          </Button>

          <Button variant="learnMore" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <img src={svg.banner} alt="Banner" className="max-w-full h-auto object-contain" />
      </div>
    </section>
  );
}
