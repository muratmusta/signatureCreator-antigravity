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
export { Template11 } from './Template11';
export { Template12 } from './Template12';
export { Template13 } from './Template13';
export { Template14 } from './Template14';
export { Template15 } from './Template15';
export { Template16 } from './Template16';
export { Template17 } from './Template17';
export { Template18 } from './Template18';
export { Template19 } from './Template19';
export { Template20 } from './Template20';

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
import { Template11 } from './Template11';
import { Template12 } from './Template12';
import { Template13 } from './Template13';
import { Template14 } from './Template14';
import { Template15 } from './Template15';
import { Template16 } from './Template16';
import { Template17 } from './Template17';
import { Template18 } from './Template18';
import { Template19 } from './Template19';
import { Template20 } from './Template20';
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
    11: Template11,
    12: Template12,
    13: Template13,
    14: Template14,
    15: Template15,
    16: Template16,
    17: Template17,
    18: Template18,
    19: Template19,
    20: Template20,
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
    11: 'Tech Startup',
    12: 'Yaratıcı Merkez',
    13: 'Resmi / Hukuki',
    14: 'Kompakt Kart',
    15: 'Sosyal Fenomen',
    16: 'Geliştirici / Kod',
    17: 'Emlak / Gayrimenkul',
    18: 'Tıp / Sağlık',
    19: 'Akademik / Mezun',
    20: 'Yönetici / Minimal',
} as const;
