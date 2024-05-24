import { HTMLAttributes } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

export default function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={
                " text-sm text-red-600 inline-block p-3 bg-red-200 bg-opacity-50 rounded " +
                className
            }
        >
            <div className="flex space-x-2 items-center">
                <RiErrorWarningLine className="text-xl" /> <p>{message}</p>
            </div>
        </p>
    ) : null;
}
