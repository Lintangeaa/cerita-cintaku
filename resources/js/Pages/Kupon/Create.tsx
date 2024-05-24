import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FormKupon from "./Partials/Form";
import Alert from "@/Components/Alert";
import { generateRandomString } from "@/utils/service";

const createKuponPage = ({ auth }: any) => {
    const [alert, setAlert] = useState({ type: "", message: "" });
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            kode: generateRandomString(4),
            expired_at: "",
            name: "",
            desc: "",
            is_claim: false,
        });

    const today = new Date().toISOString().split("T")[0];
    const submit = async (e: any) => {
        e.preventDefault();

        if (new Date(data.expired_at) < new Date(today)) {
            setAlert({
                type: "warning",
                message:
                    "Tanggal kedaluwarsa tidak boleh kurang dari hari ini!",
            });
            setTimeout(() => setAlert({ type: "", message: "" }), 2000);
            return;
        }
        try {
            await post(route("kupon.store"), { data: data });
            setAlert({
                type: "success",
                message: "Kupon berhasil ditambahkan.",
            });
            setTimeout(() => setAlert({ type: "", message: "" }), 2000);
        } catch (error: any) {
            setAlert({
                type: "error",
                message: error.response.data.message,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Tambah Kupon
                </h2>
            }
        >
            <Head title="Tambah Kupon" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {alert.type && (
                        <Alert type={alert.type} message={alert.message} />
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormKupon
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            isEdit={false}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default createKuponPage;
