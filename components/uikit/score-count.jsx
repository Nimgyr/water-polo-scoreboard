import clsx from "clsx";

/**
 * @param {{
 * children: any,
 * className: string,
 * size: 'sm' | 'md' | 'lg',
 * }} props
 */

export function ScoreCount({ children, className, size }) {
    const buttonClassName = clsx(
        className,
        "font-digital text-white flex justify-center leading-[150px]",
        {
            sm: "text-clamp",
            lg: "text-clampScoreboard",
        }[size]
    );

    return <div className={buttonClassName}>{children}</div>;
}
