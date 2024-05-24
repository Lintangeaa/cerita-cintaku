import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaCheck, FaTimes } from "react-icons/fa";

const KuponDetail = ({ auth, kupon }: { auth: any; kupon: any }) => {
    const stringData = JSON.stringify(kupon);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Detail Kupon
                </h2>
            }
        >
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <div>
                        <QRCode
                            className="absolute top-0 right-0 mt-2 mr-2 w-2 border-2 border-green-500  p-2 rounded"
                            value={stringData}
                        />
                    </div>
                    <h1 className="text-2xl font-semibold mb-4">
                        {kupon.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{kupon.desc}</p>
                    <div className="flex justify-between items-center mb-4">
                        <p className="flex text-sm text-gray-500">
                            Kode:{" "}
                            <p className="ms-3 font-bold text-black">
                                {" "}
                                {kupon.kode}
                            </p>
                        </p>
                        <p className="text-sm text-gray-500">ID: {kupon.id}</p>
                    </div>
                    <div className="flex flex-col space-y-5 mb-4">
                        <p className="text-sm text-gray-500">
                            Expired at: {kupon.expired_at.split("T")[0]}
                        </p>
                        <p className="text-sm text-gray-500">
                            Created at: {kupon.created_at.split("T")[0]}
                        </p>

                        <p className="text-sm text-gray-500">
                            Updated at: {kupon.updated_at.split("T")[0]}
                        </p>
                        <p className="text-sm ">
                            {kupon.is_claim ? (
                                <div className="flex justify-center space-x-3 items-center">
                                    <FaCheck style={{ color: "green" }} />
                                    <div>Sudah Diclaim</div>
                                </div>
                            ) : (
                                <div className="flex justify-center space-x-3 items-center">
                                    <FaTimes style={{ color: "red" }} />
                                    <div>Belum Diclaim</div>
                                </div>
                            )}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link href="/kupon">
                            <PrimaryButton>Kembali</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default KuponDetail;
