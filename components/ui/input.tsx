"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  textarea?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  rows?: number; // for textarea
  id?: string;
};

type InputOnlyProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaOnlyProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, BaseProps & (InputOnlyProps | TextareaOnlyProps)>(
  (
    {
      label,
      name,
      placeholder,
      type = "text",
      textarea = false,
      required = false,
      helperText,
      error,
      className,
      labelClassName,
      containerClassName,
      rows = 4,
      id,
      ...rest
    },
    ref
  ) => {
    const autoId = React.useId();
    const inputId = id ?? `${name || "field"}-${autoId}`;

    const baseFieldClasses =
      "block w-full rounded-lg border bg-white/5 px-3 py-2 text-sm text-primary placeholder:text-neutral-500 ring-1 ring-white/10 " +
      "focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50 " +
      "data-[invalid=true]:border-red-500 data-[invalid=true]:ring-red-500/30";

    const field = textarea ? (
      <textarea
        id={inputId}
        name={name}
        placeholder={placeholder}
        rows={rows}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        aria-invalid={!!error || undefined}
        aria-describedby={helperText || error ? `${inputId}-desc` : undefined}
        data-invalid={!!error || undefined}
        className={cn(baseFieldClasses, className)}
        {...(rest as TextareaOnlyProps)}
      />
    ) : (
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLInputElement>}
        aria-invalid={!!error || undefined}
        aria-describedby={helperText || error ? `${inputId}-desc` : undefined}
        data-invalid={!!error || undefined}
        className={cn(baseFieldClasses, className)}
        {...(rest as InputOnlyProps)}
      />
    );

    return (
      <div className={cn("mb-3", containerClassName)}>
        <label htmlFor={inputId} className={cn("mb-1 block text-sm text-primary", labelClassName)}>
          <span>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </span>
        </label>

        {field}

        {(helperText || error) && (
          <p
            id={`${inputId}-desc`}
            className={cn(
              "mt-1 text-xs",
              error ? "text-red-400" : "text-neutral-400"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
