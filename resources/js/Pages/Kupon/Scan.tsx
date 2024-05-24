// QRScanner.js

import React, { useRef, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import QrScanner from "qr-scanner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Inertia from "@inertiajs/react";

const QRScanner = ({ auth }: { auth: any }) => {
    const [scannedResult, setScannedResult] = useState("");
    const [showCamera, setShowCamera] = useState(true);
    const videoRef: any = useRef(null);
    const fileInputRef: any = useRef(null);

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setShowCamera(false);
            return;
        }

        const qrScanner = new QrScanner(videoRef.current, (result) => {
            setScannedResult(result);
        });

        qrScanner.start();

        return () => {
            qrScanner.stop();
        };
    }, []);

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.onload = () => {
            QrScanner.scanImage(img)
                .then((result) => {
                    console.log("Scanned QR code from image:", result);
                    setScannedResult(result);
                })
                .catch((error) => {
                    console.error(error);
                    alert("No QR code found in the image");
                });
        };
        img.src = URL.createObjectURL(file);
    };

    const { put } = useForm();

    const handleClaim = (kode: string) => {
        put(route("kupon.claim", { kode: kode }));
    };

    const showConfirmationDialog = (result: string) => {
        const data = JSON.parse(result);
        if (data && data.kode) {
            if (window.confirm("Do you want to claim this coupon?")) {
                handleClaim(data.kode);
            }
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-12">
                <div className="bg-white rounded p-3">
                    <h1>QR Scanner</h1>
                    {showCamera ? (
                        <video ref={videoRef} />
                    ) : (
                        <div>No Camera</div>
                    )}
                    {scannedResult && <p>Scanned QR code: {scannedResult}</p>}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <PrimaryButton onClick={() => fileInputRef.current.click()}>
                        Upload Image
                    </PrimaryButton>

                    <button
                        onClick={() => showConfirmationDialog(scannedResult)}
                    >
                        Claim Coupon
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default QRScanner;
