import React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
    type: string;
    message: string;
}

const Alert: React.FC<Props> = ({ type, message }) => {
    let classname;
    if (type == "success") {
        classname = "bg-green-200 inline-block text-green-600 rounded";
    } else {
        classname = "bg-red-200 inline-block text-red-600 rounded";
    }
    return (
        <div className={"p-3 " + classname}>
            <div className="flex justify-center items-center">
                {type == "success" ? (
                    <IoChevronDownCircleOutline className="text-xl" />
                ) : (
                    <RiErrorWarningLine className="text-xl" />
                )}
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alert;
