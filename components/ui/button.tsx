import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-12 rounded-full text-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type AsProp<E extends React.ElementType> = { as?: E };
type PropsToOmit<E extends React.ElementType, P> = keyof (AsProp<E> & P);

export type PolymorphicProps<E extends React.ElementType, P> =
  P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, P>>;

export type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonComponent = <E extends React.ElementType = "button">(
  props: PolymorphicProps<E, ButtonBaseProps> &
    Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonBaseProps | "as">
) => React.ReactElement | null;

export const Button = React.forwardRef(function Button<
  E extends React.ElementType = "button"
>(
  {
    as,
    className,
    variant,
    size,
    ...props
  }: PolymorphicProps<E, ButtonBaseProps>,
  ref: React.Ref<Element>
) {
  const Comp = (as || "button") as React.ElementType;
  return (
    <Comp
      ref={ref as any}
      className={cn(buttonVariants({ variant, size, className }))}
      {...(props as any)}
    />
  );
}) as ButtonComponent;

export { buttonVariants };
