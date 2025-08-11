"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg"

const sizeMap: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

export interface StarProps extends React.SVGProps<SVGSVGElement> {
  filled?: boolean
  half?: boolean
  size?: Size
  activeColor?: string
  
  inactiveColor?: string
}


export const Star = React.forwardRef<SVGSVGElement, StarProps>(
  (
    {
      className,
      filled,
      half,
      size = "md",
      activeColor = "text-yellow-500",
      inactiveColor = "text-black",
      ...props
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn(sizeMap[size], "shrink-0", className)}
        {...props}
      >
      
        {!filled && !half && (
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z"
            className={inactiveColor}
            fill="currentColor"
          />
        )}

    
        {filled && !half && (
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z"
            className={activeColor}
            fill="currentColor"
          />
        )}


        {half && (
          <>
   
            <g clipPath="url(#half)">
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                className={activeColor}
                fill="currentColor"
              />
            </g>
 
            <g clipPath="url(#half-right)">
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z"
                className={inactiveColor}
                fill="currentColor"
              />
            </g>
          </>
        )}

        <defs>
          <clipPath id="half">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
          <clipPath id="half-right">
            <rect x="12" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      </svg>
    )
  }
)
Star.displayName = "Star"

export interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  count?: number
  value?: number
  defaultValue?: number
  allowHalf?: boolean
  disabled?: boolean
  readOnly?: boolean
  size?: Size
  onChange?: (value: number) => void
  "aria-label"?: string
  activeColor?: string
  inactiveColor?: string
}

export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      className,
      count = 5,
      value,
      defaultValue = 0,
      allowHalf = true,
      disabled,
      readOnly,
      size = "md",
      onChange,
      "aria-label": ariaLabel = "Rating",
      activeColor = "text-yellow-500",
      inactiveColor = "text-black",
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<number>(defaultValue)
    const current = isControlled ? (value as number) : internal
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const setValue = (v: number) => {
      if (disabled || readOnly) return
      if (!isControlled) setInternal(v)
      onChange?.(v)
    }

    const getValueFromEvent = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      index: number
    ) => {
      if (!allowHalf) return index + 1
      const target = e.currentTarget
      const { left, width } = target.getBoundingClientRect()
      const x = e.clientX - left
      const half = x <= width / 2 ? 0.5 : 1
      return index + half
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return
      const step = allowHalf ? 0.5 : 1
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setValue(Math.min(current + step, count))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setValue(Math.max(current - step, 0))
      } else if (e.key === "Home") {
        e.preventDefault()
        setValue(0)
      } else if (e.key === "End") {
        e.preventDefault()
        setValue(count)
      }
    }

    const display = hoverValue ?? current

    return (
      <div
        ref={ref}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={count}
        aria-valuenow={Math.round(current * 10) / 10}
        aria-readonly={readOnly || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled || readOnly ? -1 : 0}
        onKeyDown={onKeyDown}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => {
          const starIndex = i + 1
          const filled = display >= starIndex
          const half =
            allowHalf && !filled && display >= starIndex - 0.5 && display < starIndex

          return (
            <button
              key={i}
              type="button"
              className={cn(
                "group relative inline-flex select-none items-center justify-center outline-none",
                disabled || readOnly ? "cursor-default" : "cursor-pointer"
              )}
              disabled={disabled}
              onMouseMove={(e) => {
                if (disabled || readOnly) return
                const v = getValueFromEvent(e, i)
                setHoverValue(v)
              }}
              onMouseLeave={() => setHoverValue(null)}
              onClick={(e) => {
                if (disabled || readOnly) return
                const v = getValueFromEvent(e, i)
                setValue(v)
              }}
              aria-label={`Set ${allowHalf ? "half or full" : "full"} star ${starIndex}`}
            >
              <Star
                size={size}
                filled={filled}
                half={half}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                className="transition-colors"
              />
            </button>
          )
        })}
      </div>
    )
  }
)
StarRating.displayName = "StarRating"
