import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-forest" />
                <h2 className="mt-4 text-lg font-semibold text-gray-700">SignatureOS Yükleniyor...</h2>
                <p className="text-sm text-gray-500">Lütfen bekleyin, editör hazırlanıyor.</p>
            </div>
        </div>
    );
}
