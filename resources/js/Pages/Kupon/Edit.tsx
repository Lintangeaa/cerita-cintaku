import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


import FormKupon from "./Partials/Form";

const EditUserPage = ({ auth, kupon }: { auth: any; kupon: any }) => {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            is_claim: kupon.is_claim,
            expired_at: kupon.expired_at,
            name: kupon.name,
            desc: kupon.desc,
        });
    const submit = (e: any) => {
        e.preventDefault();
        put(route("kupon.update", kupon.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Edit Kupon
                </h2>
            }
        >
            <Head title="Edit Kupon" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormKupon
                            isEdit
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditUserPage;
