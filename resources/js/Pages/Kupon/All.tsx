import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableKupon from "./Partials/Table";
import { Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string;
        };
    };
    kupons: {
        data: Kupon[];
    };
}

interface Kupon {
    id: number;
    kode: string;
    expired_at: string;
    name: string;
    desc: string;
    is_claim: boolean;
}

export default function GetAllKupons({ auth, kupons }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h1>Kupon</h1>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="w-full flex space-x-3 justify-end">
                        <Link
                            className="p-2 rounded-full bg-white text-black text-sm shadow-md"
                            href="/kupon/create"
                        >
                            <FiPlus size={20} />
                        </Link>
                        <Link
                            className="p-2 rounded-full bg-white text-black text-sm shadow-md"
                            href="/kupon/scan"
                        >
                            <BsQrCodeScan size={20} />
                        </Link>
                    </div>
                    {kupons.data.length > 0 ? (
                        <TableKupon kupon={kupons.data} />
                    ) : (
                        <div>Tidak Ada</div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
