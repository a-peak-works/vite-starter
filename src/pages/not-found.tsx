"use client";

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
              <span className="tt-md-semi text-brand-secondary">404 error</span>
              <h1 className="td-md-semi text-primary md:td-lg-semi lg:td-xl-semi">
                We can’t find that page
              </h1>
            </div>
            <p className="tt-lg text-tertiary md:tt-xl">
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              onClick={() => router(-1)}
              color="secondary"
              size="xl"
              className="lg:hidden"
              iconLeading={ArrowLeft}
            >
              Go back
            </Button>
            <Button
              onClick={() => router(-1)}
              color="secondary"
              size="2xl"
              className="hidden lg:flex"
              iconLeading={ArrowLeft}
            >
              Go back
            </Button>
            <Button href="/" size="xl" className="lg:hidden">
              Take me home
            </Button>
            <Button href="/" size="2xl" className="hidden lg:flex">
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
