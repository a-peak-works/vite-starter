import { ArrowLeft } from "@untitledui/icons";
import { useNavigate } from "react-router";
import { Button } from "@/components/shared/buttons/button";

export function NotFound() {
  const router = useNavigate();

  return (
    <section className="flex min-h-screen items-start bg-primary py-16 md:items-center md:py-24">
      <div className="mx-auto max-w-container grow px-4 md:px-8">
        <div className="flex w-full max-w-3xl flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold text-brand-secondary">
                404 error
              </span>
              <h1 className="text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                We can’t find that page
              </h1>
            </div>
            <p className="text-lg text-tertiary md:text-xl">
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              color="secondary"
              size="xl"
              className="lg:hidden"
              iconLeading={ArrowLeft}
              onClick={() => router(-1)}
            >
              Go back
            </Button>
            <Button
              color="secondary"
              size="2xl"
              className="hidden lg:flex"
              iconLeading={ArrowLeft}
              onClick={() => router(-1)}
            >
              Go back
            </Button>
            <Button size="xl" className="lg:hidden" onClick={() => router(-1)}>
              Take me home
            </Button>
            <Button
              size="2xl"
              className="hidden lg:flex"
              onClick={() => router(-1)}
            >
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
