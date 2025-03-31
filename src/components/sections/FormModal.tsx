import React, { useState, FormEvent } from "react";
import { Button } from "../../components/ui/button";

export interface RegistrationData {
    fullName: string;
    email: string;
    phone: string;
    collegeName: string;
    passType: "solo" | "duo" | "trio" | "quadro";
    transactionID: string;
    paymentScreenshot: File | null;
}

interface RegistrationFormProps {
    eventTitle?: string;
    onClose: () => void;
    onSubmit: (data: RegistrationData) => void;
}

export const RegistrationForm = ({
    eventTitle = "Cypher 2K25 Passes",
    onClose,
    onSubmit,
}: RegistrationFormProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(1);

    // Personal details
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [collegeName, setCollegeName] = useState("");

    // Pass type
    const [passType, setPassType] = useState<"solo" | "duo" | "trio" | "quadro">("solo");

    // Payment details
    const [transactionID, setTransactionID] = useState("");
    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPaymentScreenshot(e.target.files[0]);
        }
    };

    const passPrices = {
        solo: 400,
        duo: 750,
        trio: 1125,
        quadro: 1525,
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            alert('Registration successful!');
            onClose();
            onSubmit({
                fullName,
                email,
                phone,
                collegeName,
                passType,
                transactionID,
                paymentScreenshot,
            });
        } catch (error: any) {
            console.error('Registration failed:', error);
            alert(`Registration failed: ${error.message}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-black/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md overflow-y-auto max-h-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-2xl leading-none focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-2xl text-amber-500 font-bold mb-4 text-center">
                    Buy {eventTitle}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Page 1: Personal Details */}
                    {currentPage === 1 && (
                        <div className="space-y-3">
                            <div>
                                <label htmlFor="fullName" className="block text-white mb-1 text-sm">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-white mb-1 text-sm">
                                    Phone No.
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-white mb-1 text-sm">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="collegeName" className="block text-white mb-1 text-sm">
                                    College Name
                                </label>
                                <input
                                    id="collegeName"
                                    type="text"
                                    value={collegeName}
                                    onChange={(e) => setCollegeName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* Page 2: Pass Type */}
                    {currentPage === 2 && (
                        <div className="space-y-3">
                            <div className="p-3 border border-amber-500/30 rounded-lg space-y-3">
                                <h3 className="text-lg text-amber-500 font-bold mb-2">Select Pass Type</h3>
                                <select
                                    value={passType}
                                    onChange={(e) => setPassType(e.target.value as "solo" | "duo" | "trio" | "quadro")}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                >
                                    <option value="solo">Solo Pass - ₹{passPrices.solo}</option>
                                    <option value="duo">Duo Pass - ₹{passPrices.duo}</option>
                                    <option value="trio">Trio Pass - ₹{passPrices.trio}</option>
                                    <option value="quadro">Quadro Pass - ₹{passPrices.quadro}</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Page 3: Payment Section */}
                    {currentPage === 3 && (
                        <div className="space-y-3">
                            <div className="p-3 border border-amber-500/30 rounded-lg space-y-3">
                                <h3 className="text-lg text-amber-500 font-bold">Price: ₹{passPrices[passType]}</h3>
                                <div className="flex justify-center">
                                    <img
                                        src="/images/payment/mvsp QR.jpg"
                                        alt="QR Code for Payment"
                                        className="w-32 h-32"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="transactionID" className="block text-white mb-1 text-sm">
                                        Transaction ID
                                    </label>
                                    <input
                                        id="transactionID"
                                        type="text"
                                        value={transactionID}
                                        onChange={(e) => setTransactionID(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="paymentScreenshot" className="block text-white mb-1 text-sm">
                                        Payment Screenshot
                                    </label>
                                    <input
                                        id="paymentScreenshot"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required
                                        className="w-full text-white text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        {currentPage > 1 && (
                            <Button
                                type="button"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                            >
                                Previous
                            </Button>
                        )}
                        {currentPage < 3 && (
                            <Button
                                type="button"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="ml-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded text-sm"
                            >
                                Next
                            </Button>
                        )}
                        {currentPage === 3 && (
                            <Button
                                type="submit"
                                className="ml-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded text-sm"
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};