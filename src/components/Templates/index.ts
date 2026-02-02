export { Template1 } from './Template1';
export { Template2 } from './Template2';
export { Template3 } from './Template3';
export { Template4 } from './Template4';
export { Template5 } from './Template5';
export { Template6 } from './Template6';
export { Template7 } from './Template7';
export { Template8 } from './Template8';
export { Template9 } from './Template9';
export { Template10 } from './Template10';

import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { Template3 } from './Template3';
import { Template4 } from './Template4';
import { Template5 } from './Template5';
import { Template6 } from './Template6';
import { Template7 } from './Template7';
import { Template8 } from './Template8';
import { Template9 } from './Template9';
import { Template10 } from './Template10';
import type { TemplateId } from '../../types/signature';

export const templates = {
    1: Template1,
    2: Template2,
    3: Template3,
    4: Template4,
    5: Template5,
    6: Template6,
    7: Template7,
    8: Template8,
    9: Template9,
    10: Template10,
} as const;

export const getTemplate = (id: TemplateId) => templates[id];

export const templateNames = {
    1: 'Klasik Yatay',
    2: 'Dikey Stack',
    3: 'Minimal',
    4: 'Profesyonel',
    5: 'Modern Kart',
    6: 'İki Sütun',
    7: 'Banner',
    8: 'Renkli Blok',
    9: 'İkon Odaklı',
    10: 'Lüks/Kurumsal',
} as const;
