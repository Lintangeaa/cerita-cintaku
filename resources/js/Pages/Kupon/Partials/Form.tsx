import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { generateRandomString } from "@/utils/service";
import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface PageProps {
    data: any;
    setData: any;
    submit: any;
    errors: any;
    processing: any;
    isEdit: boolean;
}

const FormKupon = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit,
}: PageProps) => {
    console.log(data["expired_at"]);
    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid-cols-1 md:grid-cols-2 grid gap-3 ">
                <div>
                    <InputLabel htmlFor="expired_at" value="Expired At" />

                    <TextInput
                        id="expired_at"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.expired_at.split("T")[0]}
                        onChange={(e) => setData("expired_at", e.target.value)}
                        required={!isEdit}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.expired_at} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required={!isEdit}
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Desc" />

                    <TextInput
                        id="desc"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.desc}
                        onChange={(e) => setData("desc", e.target.value)}
                        required={!isEdit}
                    />

                    <InputError className="mt-2" message={errors.desc} />
                </div>

                {isEdit && (
                    <div>
                        <InputLabel htmlFor="is_claim" value="Status Klaim" />
                        <div className="w-fit">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-gray-400 mt-1 border-transparent text-sm leading-4 font-medium rounded-md text-black bg-white focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {data.is_claim ? (
                                                <FaCheck
                                                    style={{ color: "green" }}
                                                />
                                            ) : (
                                                <FaTimes
                                                    style={{ color: "red" }}
                                                />
                                            )}
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <ul>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    setData("is_claim", false)
                                                }
                                                type="button"
                                                className="w-full hover:bg-zinc-700 text-black"
                                            >
                                                Belum Klaim
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    setData("is_claim", true)
                                                }
                                                type="button"
                                                className="w-full hover:bg-zinc-700 text-black"
                                            >
                                                Sudah Klaim
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError
                                className="mt-2"
                                message={errors.is_claim}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {isEdit ? "SAVE" : "CREATE"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormKupon;
