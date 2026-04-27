import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-[16px] font-[600] transition-all disabled:pointer-events-none disabled:bg-[#CCCCCC] disabled:text-[#888888] disabled:border-transparent [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#C89211] focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default: 'bg-[#192E4C] text-[#FFFFFF] hover:bg-[#C89211] hover:text-[#192E4C] dark:hover:bg-[#D6A833] active:bg-[#0D1B2E] active:scale-[0.98]',
        destructive: 'bg-[#C62828] text-white hover:bg-[#B71C1C]',
        outline: 'border border-input bg-background shadow-xs hover:bg-[#EBF0F5] hover:text-[#192E4C]',
        secondary: 'bg-transparent border-[2px] border-[#192E4C] text-[#192E4C] hover:bg-[#EBF0F5] hover:border-[#192E4C] dark:border-[#C89211] dark:text-[#C89211] dark:hover:bg-white/10 dark:hover:border-[#C89211]',
        ghost: 'hover:bg-[#EBF0F5] hover:text-[#192E4C] dark:hover:bg-white/10 dark:hover:text-white',
        link: 'text-[#192E4C] underline-offset-4 hover:text-[#C89211] hover:underline dark:text-[#C89211] dark:hover:text-white',
      },
      size: {
        default: 'px-[24px] py-[12px] has-[>svg]:px-[16px]',
        sm: 'h-8 rounded-[4px] gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-[12px] px-8 has-[>svg]:px-5',
        icon: 'size-11',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
