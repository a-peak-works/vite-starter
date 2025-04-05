import UntitledLogoMinimal from "@/components/foundations/logo/UntitledLogoMinimal";
import { Button } from "@/components/shared/buttons/button";
import ButtonUtility from "@/components/shared/buttons/button-utility";
import { BookOpen01, Copy01, Cube01, HelpCircle } from "@untitledui/icons";
import { lazy } from "react";

const Header = lazy(() =>
    import("@/components/marketing/header-navigation/components/header").then((mod) => ({ default: mod.Header }))
);

export const HomeScreen = () => {
    return (
        <div className="flex h-dvh flex-col">
            <Header />

            <div className="flex px-4 min-h-0 flex-1 flex-col items-center justify-center">
                <div className="relative flex size-28 items-center justify-center">
                    <UntitledLogoMinimal className="size-10" />

                    <svg
                        width="480"
                        height="480"
                        viewBox="0 0 480 480"
                        fill="none"
                        className="absolute -z-1 text-border-secondary">
                        <mask
                            id="mask0_4933_393068"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="480"
                            height="480">
                            <rect width="480" height="480" fill="url(#paint0_radial_4933_393068)" />
                        </mask>
                        <g mask="url(#mask0_4933_393068)">
                            <circle cx="240" cy="240" r="47.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="79.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="111.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="143.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="143.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="175.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="207.5" stroke="currentColor" />
                            <circle cx="240" cy="240" r="239.5" stroke="currentColor" />
                        </g>
                        <defs>
                            <radialGradient
                                id="paint0_radial_4933_393068"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(240 240) rotate(90) scale(240 240)">
                                <stop />
                                <stop offset="1" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>

                <h1 className="max-w-3xl text-center text-display-sm font-semibold text-primary">
                    Welcome to the beginning of your next beautiful app
                </h1>

                <p className="mt-2 max-w-xl text-center text-lg text-tertiary">
                    Get started by either using existing components that came with this starter kit or add new ones:
                </p>

                <div className="relative mt-6 flex h-10 items-center rounded-lg border border-secondary bg-secondary">
                    <code className="px-3 font-mono text-secondary">npx untitledui@latest add</code>

                    <hr className="h-10 w-px bg-border-secondary" />

                    <ButtonUtility color="tertiary" size="sm" icon={Copy01} tooltip="Copy" className="mx-1" />
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <Button
                        isExternal
                        href="https://untitledui-docs.vercel.app/"
                        color="link-color"
                        size="lg"
                        iconLeading={BookOpen01}>
                        Docs
                    </Button>
                    <div className="h-px w-4 bg-brand-solid" />
                    <Button
                        isExternal
                        href="https://untitledui-docs.vercel.app/resources/icons"
                        color="link-color"
                        size="lg"
                        iconLeading={Cube01}>
                        Icons
                    </Button>
                    <div className="h-px w-4 bg-brand-solid" />
                    <Button
                        isExternal
                        href="https://dsc.gg/untitledui"
                        color="link-color"
                        size="lg"
                        iconLeading={HelpCircle}>
                        Help
                    </Button>
                </div>
            </div>
        </div>
    );
};
