import { Fragment, lazy } from "react";
import { ArrowRight } from "@untitledui/icons";
import { BadgeGroup } from "@/components/shared/badges/badge-groups";
import { Button } from "@/components/shared/buttons/button";
import { Form } from "@/components/shared/form/form";
import { Input } from "@/components/shared/input";

const Header = lazy(() =>
  import("@/components/marketing/header-navigation/components/header").then(
    (mod) => ({ default: mod.Header }),
  ),
);
export const HomeScreen = () => {
  return (
    <Fragment>
      <Header />

      <section className="relative bg-primary py-16 lg:flex lg:min-h-[720px] lg:items-center lg:py-24">
        <div className="mx-auto flex w-full max-w-container items-center px-4 md:px-8">
          <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pr-8">
            <a
              href="#"
              className="rounded-[10px] outline-focus-ring focus:outline-2 focus:outline-offset-2"
            >
              <BadgeGroup
                className="hidden md:flex"
                size="lg"
                addonText="We're hiring!"
                iconTrailing={ArrowRight}
                theme="modern"
                color="brand"
              >
                Join our remote team
              </BadgeGroup>
              <BadgeGroup
                className="md:hidden"
                size="md"
                addonText="We're hiring!"
                iconTrailing={ArrowRight}
                theme="modern"
                color="brand"
              >
                Join our remote team
              </BadgeGroup>
            </a>

            <h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
              People who care about your growth
            </h1>
            <p className="mt-4 text-lg text-tertiary md:mt-6 md:max-w-lg md:text-xl">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                console.log("Form data:", data);
              }}
              className="mt-8 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-[480px] md:flex-row md:items-start"
            >
              <Input
                isRequired
                size="md"
                name="email"
                type="email"
                wrapperClassName="py-0.5"
                placeholder="Enter your email"
                validate={(value) =>
                  value.includes("@") || "Please enter a valid email"
                }
                hint={
                  <span>
                    We care about your data in our{" "}
                    <a
                      href="#"
                      className="rounded-sm underline underline-offset-3 outline-focus-ring focus:outline-2 focus:outline-offset-2"
                    >
                      privacy policy
                    </a>
                    .
                  </span>
                }
              />
              <Button type="submit" size="xl">
                Get started
              </Button>
            </Form>
          </div>
        </div>
        <div className="relative mt-16 h-[240px] w-full px-4 md:h-[380px] md:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
          <img
            className="inset-0 size-full object-cover lg:absolute"
            src="/marketing/spirals.webp"
            alt="Spirals"
          />
        </div>
      </section>
    </Fragment>
  );
};
