'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, FileImage, FileType, Code, QrCode } from 'lucide-react';
import { generateVCard, generateQRCode } from '@/utils/vcard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { useSignature } from '@/context/SignatureContext';
import { renderSignatureToHtml } from '@/utils/renderSignature';

interface ExportButtonProps {
    targetElementId?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ targetElementId = 'signature-preview' }) => {
    const { data, selectedTemplate } = useSignature();
    const [exporting, setExporting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const exportToHTML = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const htmlContent = await renderSignatureToHtml(selectedTemplate, data);
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `signature-${data.fullName.replace(/\s+/g, '-').toLowerCase() || 'new'}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success('HTML olarak indirildi!');
        } catch (error) {
            console.error('HTML export error:', error);
            toast.error('HTML oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToPNG = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const element = document.getElementById(targetElementId);
            if (!element) {
                toast.error('Önizleme bulunamadı');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
            });

            canvas.toBlob((blob) => {
                if (!blob) {
                    toast.error('PNG oluşturulamadı');
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `signature-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                toast.success('PNG olarak indirildi!');
            }, 'image/png');
        } catch (error) {
            console.error('PNG export error:', error);
            toast.error('PNG oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToPDF = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const element = document.getElementById(targetElementId);
            if (!element) {
                toast.error('Önizleme bulunamadı');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`signature-${Date.now()}.pdf`);

            toast.success('PDF olarak indirildi!');
        } catch (error) {
            console.error('PDF export error:', error);
            toast.error('PDF oluşturulurken hata oluştu');
        } finally {
            setExporting(false);
        }
    };

    const exportToVCard = async () => {
        setExporting(true);
        setShowMenu(false);

        try {
            const vCardContent = generateVCard(data);
            const qrCodeUrl = await generateQRCode(vCardContent);

            if (qrCodeUrl) {
                const link = document.createElement('a');
                link.href = qrCodeUrl;
                link.download = `vcard-qr-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('vCard QR Kodu indirildi!');
            }
        } catch (error) {
            console.error('vCard export error:', error);
            toast.error('Kod oluşturulamadı');
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="relative">
            <Button
                variant="default"
                size="lg"
                className="gap-2.5 h-11 px-5 rounded-2xl font-black text-xs tracking-widest bg-forest text-white border-forest hover:bg-forest/90 shadow-premium transition-all active:scale-95 disabled:opacity-70 group"
                onClick={() => setShowMenu(!showMenu)}
                disabled={exporting}
            >
                {exporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                )}
                DIŞA AKTAR
            </Button>

            {showMenu && !exporting && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    />

                    <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-3xl shadow-premium-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 bg-gray-50/50 border-b border-gray-100">
                            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase px-2">FORMAT SEÇİN</span>
                        </div>

                        <div className="p-2 space-y-1">
                            <button
                                onClick={exportToHTML}
                                className="w-full p-3 rounded-2xl text-left hover:bg-forest/5 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                                    <Code className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">HTML Olarak İndir</div>
                                    <div className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">EMAIL İSTEMCİLERİ</div>
                                </div>
                            </button>

                            <button
                                onClick={exportToPNG}
                                className="w-full p-3 rounded-2xl text-left hover:bg-forest/5 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                                    <FileImage className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">PNG Olarak İndir</div>
                                    <div className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">YÜKSEK KALİTE GÖRSEL</div>
                                </div>
                            </button>

                            <button
                                onClick={exportToPDF}
                                className="w-full p-3 rounded-2xl text-left hover:bg-forest/5 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                                    <FileType className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">PDF Olarak İndir</div>
                                    <div className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">YAZDIRILABİLİR FORMAT</div>
                                </div>
                            </button>
                            <button
                                onClick={exportToVCard}
                                className="w-full p-3 rounded-2xl text-left hover:bg-forest/5 transition-all flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                                    <QrCode className="w-5 h-5 text-forest" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">vCard QR Kodu</div>
                                    <div className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">MOBİL REHBER TASARIMI</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
