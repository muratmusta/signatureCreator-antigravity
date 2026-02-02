import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OutlookGuide: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        // Glassmorphism Overlay - WISE Style
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-forest/80 animate-fade-in"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - WISE Forest */}
                <div className="bg-forest text-white p-8 rounded-t-3xl">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="w-12 h-12 bg-lime rounded-2xl flex items-center justify-center mb-4">
                                <span className="text-2xl">📨</span>
                            </div>
                            <h3 className="text-2xl font-extrabold tracking-tight mb-2">
                                Outlook'a İmza Ekleme
                            </h3>
                            <p className="text-lime/80 text-sm font-medium">
                                Profesyonel imzanızı Outlook'a eklemek için adım adım rehber
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 hover:scale-110"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Step 0: Copy First */}
                    <div className="bg-lime/20 border-2 border-lime/40 rounded-2xl p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <p className="font-bold text-forest mb-2">Önce İmzayı Kopyalayın</p>
                                <p className="text-sm text-forest/80 font-medium">
                                    Yukarıdaki <strong>"İmzayı Kopyala"</strong> butonuna tıklayarak imzanızı panoya kopyalayın.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs for Different Versions */}
                    <div className="space-y-6">
                        {/* Outlook Web */}
                        <div>
                            <div className="bg-forest/5 rounded-2xl p-4 mb-4">
                                <h4 className="font-extrabold text-forest text-lg flex items-center gap-2">
                                    <span className="text-2xl">🌐</span>
                                    Outlook Web (Tarayıcı)
                                </h4>
                            </div>
                            <ol className="space-y-4">
                                {[
                                    { step: 1, text: 'Outlook.com veya Office 365 Outlook\'u açın' },
                                    { step: 2, text: 'Sağ üstteki ⚙️ Ayarlar ikonuna tıklayın' },
                                    { step: 3, text: '"Tüm Outlook Ayarlarını Görüntüle" seçeneğini seçin' },
                                    { step: 4, text: 'Sol menüden "E-posta" > "Oluştur ve yanıtla" sekmesini açın' },
                                    { step: 5, text: '"E-posta imzası" bölümünü bulun' },
                                    { step: 6, text: 'İmza kutusuna Ctrl+V (veya Cmd+V) ile yapıştırın', highlight: true },
                                    { step: 7, text: '"Kaydet" butonuna tıklayın' },
                                ].map((item) => (
                                    <li key={item.step} className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${item.highlight
                                                ? 'bg-lime text-forest'
                                                : 'bg-pale text-forest'
                                            }`}>
                                            {item.step}
                                        </div>
                                        <p className="text-sm text-forest font-medium pt-1">
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Outlook Desktop */}
                        <div>
                            <div className="bg-forest/5 rounded-2xl p-4 mb-4">
                                <h4 className="font-extrabold text-forest text-lg flex items-center gap-2">
                                    <span className="text-2xl">💻</span>
                                    Outlook Masaüstü Uygulaması
                                </h4>
                            </div>
                            <ol className="space-y-4">
                                {[
                                    { step: 1, text: 'Outlook uygulamasını açın' },
                                    { step: 2, text: 'Üst menüden "Dosya" > "Seçenekler" seçeneğini seçin' },
                                    { step: 3, text: 'Sol menüden "E-posta" sekmesini açın' },
                                    { step: 4, text: '"İmzalar..." butonuna tıklayın' },
                                    { step: 5, text: '"Yeni" butonuna tıklayarak yeni bir imza oluşturun' },
                                    { step: 6, text: 'İmza kutusuna Ctrl+V (veya Cmd+V) ile yapıştırın', highlight: true },
                                    { step: 7, text: '"Tamam" butonuna tıklayın' },
                                ].map((item) => (
                                    <li key={item.step} className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${item.highlight
                                                ? 'bg-lime text-forest'
                                                : 'bg-pale text-forest'
                                            }`}>
                                            {item.step}
                                        </div>
                                        <p className="text-sm text-forest font-medium pt-1">
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Success Tip */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                            <p className="font-bold text-green-900 mb-2 flex items-center gap-2">
                                <span>✅</span> İpucu
                            </p>
                            <p className="text-xs text-green-800 font-medium">
                                Yeni e-posta veya yanıt için farklı imza ayarları yapabilirsiniz.
                            </p>
                        </div>

                        {/* Warning Tip */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                            <p className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                                <span>⚠️</span> Not
                            </p>
                            <p className="text-xs text-amber-800 font-medium">
                                Bazı şirket politikaları imza eklemeyi kısıtlayabilir.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 pt-0">
                    <button
                        onClick={onClose}
                        className="w-full px-8 py-4 bg-lime text-forest rounded-full font-bold text-lg shadow-neon hover:shadow-neon-lg hover:scale-[1.02] transition-all duration-300"
                    >
                        Anladım
                    </button>
                </div>
            </div>
        </div>
    );
};
