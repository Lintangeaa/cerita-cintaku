import { Link, router } from "@inertiajs/react";
import { BsInfoCircle } from "react-icons/bs";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TiEdit, TiTrash } from "react-icons/ti";

export default function TableKupon({ kupon }: any) {
    return (
        <div className="bg-white mt-5 px-2 w-full rounded py-2">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="py-1 text-center font-normal">No.</th>
                        <th className="py-1 text-center font-normal">Kode</th>
                        <th className="py-1 text-center font-normal">
                            Kadaluarsa
                        </th>
                        <th className="py-1 text-center font-normal">Nama</th>
                        <th className="py-1 text-center font-normal">
                            Deskripsi
                        </th>
                        <th className="py-1 text-center font-normal">Klaim</th>
                        <th className="py-1 font-normal">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {kupon.map((kupon: any, i: number) => (
                        <tr
                            key={kupon.id}
                            className={
                                i % 2 === 0 ? "bg-pink-300 bg-opacity-10" : ""
                            }
                        >
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center">{kupon.kode}</td>
                            <td className="text-center">
                                {new Date(
                                    kupon.expired_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="text-center">{kupon.name}</td>
                            <td className="text-center">{kupon.desc}</td>
                            <td className="mx-auto">
                                <div className="flex justify-center items-center">
                                    {kupon.is_claim ? (
                                        <FaCheck style={{ color: "green" }} />
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </div>
                            </td>
                            <td className="mx-auto">
                                <ActionTableKupon kupon={kupon} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const ActionTableKupon = ({ kupon }: { kupon: any }) => {
    const handleDelete = () => {
        if (confirm("Apakah kamu yakin ingin menghapus kupon ini?")) {
            router.delete("/kupon/" + kupon.id);
        }
    };

    return (
        <div className="flex justify-center space-x-3 items-center">
            <Link href={"/kupon/detail/" + kupon.id}>
                <BsInfoCircle className="text-blue-500 text-md" />
            </Link>
            <Link href={"/kupon/" + kupon.id}>
                <TiEdit className="text-xl text-green-500" />
            </Link>
            <button onClick={() => handleDelete()}>
                <TiTrash className="text-xl text-red-500" />
            </button>
        </div>
    );
};
