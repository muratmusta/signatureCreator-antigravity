import React from 'react';
import { useSignature } from '../../context/SignatureContext';
import { Label } from '../ui/label';

const PRESET_COLORS = [
    '#000000', '#163300', '#9FE870', '#2563eb',
    '#db2777', '#7c3aed', '#ea580c', '#dc2626',
    '#16a34a', '#0d9488', '#2563eb', '#4f46e5'
];

export const ColorPicker: React.FC = () => {
    const { data, updateData } = useSignature();

    const handleColorSelect = (color: string) => {
        updateData({ primaryColor: color });
    };

    const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({ primaryColor: e.target.value });
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Label className="text-xs font-black tracking-widest text-gray-400 uppercase">TEMA RENGİ</Label>
                <div className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono font-bold text-gray-500 uppercase">
                    {data.primaryColor}
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`
                            w-7 h-7 rounded-lg border-2 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm
                            ${data.primaryColor === color
                                ? 'border-forest ring-4 ring-forest/10 scale-110'
                                : 'border-white hover:border-gray-200'
                            }
                        `}
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}

                {/* Custom Color Trigger */}
                <div className="relative w-7 h-7 rounded-lg overflow-hidden border-2 border-white shadow-sm hover:scale-110 transition-all group">
                    <input
                        type="color"
                        value={data.primaryColor}
                        onChange={handleCustomColorChange}
                        className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 cursor-pointer p-0 border-none bg-transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                        <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};
