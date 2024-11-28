/**
 * @param {{
 * children: any,
 * className: string,
 * size: 'sm' | 'md' | 'lg',
 * variant: 'primary' | 'secondary' | 'outline'
 * }} props
 */

import clsx from "clsx";

export function UiButton({ children, className, size, variant, onClick }) {
    const buttonClassName = clsx(
        "transition-colors",
        className,
        {
            sm: "rounded-lg px-2 py-1 w-11 h-11",
            md: "rounded px-6 py-2 text-sm leading-tight",
            lg: "rounded-lg px-5 py-2 text-2xl leading-tight",
        }[size],
        {
            primary: "bg-teal-600 hover:bg-teal-500 text-white",
            secondary:
                "bg-slate-600 hover:bg-slate-400 text-white text-clampButton font-mono",
            outline: "border border-teal-600 text-teal-600 hover:bg-teal-50",
        }[variant]
    );

    return (
        <button onClick={onClick} className={buttonClassName}>
            {children}
        </button>
    );
}
