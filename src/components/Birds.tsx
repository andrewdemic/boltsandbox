import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

type Bird = {
  id: string;
  name: string;
  scientific: string;
  habitat: string;
  size: string;
  season: string;
  description: string;
  facts: string[];
  hotspots: { id: string; cx: number; cy: number; label: string; detail: string }[];
  colors: { body: string; bodyDark: string; accent: string; belly: string; beak: string };
  svg: (active: boolean) => React.ReactNode;
};

const BIRDS: Bird[] = [
  {
    id: 'robin',
    name: 'American Robin',
    scientific: 'Turdus migratorius',
    habitat: 'Lawns, parks, gardens',
    size: '23–28 cm wingspan',
    season: 'Year-round (most common spring–summer)',
    description: 'One of the most familiar birds in North America and the state bird of New York. Robins are often seen hopping across lawns, tugging earthworms from the ground. Their cheerful caroling is a classic sign of spring.',
    facts: [
      'New York\'s official state bird',
      'Often the first bird heard singing at dawn',
      'Eats earthworms, insects, and berries',
    ],
    hotspots: [
      { id: 'breast', cx: 150, cy: 120, label: 'Red breast', detail: 'The warm orange-red breast is the robin\'s most identifying feature, present on both males and females.' },
      { id: 'beak', cx: 215, cy: 92, label: 'Yellow beak', detail: 'The yellow bill is used to probe soil for earthworms and grab insects.' },
      { id: 'eye', cx: 208, cy: 84, label: 'Dark eye ring', detail: 'A broken white eye ring surrounds the dark eye — a subtle but key field mark for identifying robins.' },
    ],
    colors: { body: '#a16207', bodyDark: '#78350f', accent: '#c2410c', belly: '#f97316', beak: '#fbbf24' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="robin-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
          <radialGradient id="robin-breast" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          <linearGradient id="robin-tail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail - graduated feathers */}
          <path d="M 88 118 L 48 108 L 52 130 L 58 128 L 54 142 L 62 138 L 62 148 L 70 142 L 92 132 Z" fill="url(#robin-tail)" />
          {/* White undertail coverts */}
          <path d="M 85 125 Q 95 140 110 138 Q 100 128 88 122 Z" fill="#fef3c7" opacity="0.5" />
          {/* Body - teardrop shape */}
          <path d="M 90 115 Q 85 85 130 80 Q 185 78 200 100 Q 200 140 160 148 Q 110 150 90 115 Z" fill="url(#robin-body)" />
          {/* Breast */}
          <path d="M 120 105 Q 140 100 175 108 Q 180 130 155 142 Q 125 140 120 105 Z" fill="url(#robin-breast)" />
          {/* Feather streaks on breast */}
          <path d="M 130 115 Q 140 118 148 115" fill="none" stroke="#9a3412" strokeWidth="0.8" opacity="0.4" />
          <path d="M 135 122 Q 145 125 153 122" fill="none" stroke="#9a3412" strokeWidth="0.8" opacity="0.4" />
          <path d="M 140 130 Q 150 133 158 130" fill="none" stroke="#9a3412" strokeWidth="0.8" opacity="0.4" />
          {/* Belly white */}
          <ellipse cx="115" cy="140" rx="18" ry="12" fill="#fef3c7" opacity="0.6" />
          {/* Head */}
          <ellipse cx="200" cy="88" rx="26" ry="24" fill="url(#robin-body)" />
          {/* Dark head cap */}
          <path d="M 178 72 Q 200 60 222 75 Q 218 82 200 80 Q 184 82 178 72 Z" fill="#451a03" opacity="0.55" />
          {/* White eye ring - broken */}
          <path d="M 204 82 Q 208 80 212 83 Q 213 86 210 87 Q 206 86 204 82 Z" fill="#fef3c7" opacity="0.7" />
          {/* Eye */}
          <circle cx="208" cy="84" r="4" fill="#1a0a00" />
          <circle cx="209.5" cy="82.5" r="1.3" fill="#fff" />
          {/* Beak - slender yellow with dark tip */}
          <path d="M 222 90 L 245 93 Q 246 95 243 96 L 224 97 Z" fill="#fbbf24" />
          <path d="M 240 94 L 246 95" stroke="#92400e" strokeWidth="0.8" />
          {/* Wing - layered coverts */}
          <path className="bird-wing" d="M 125 95 Q 155 88 172 108 Q 168 132 132 128 Q 115 118 125 95 Z" fill="#78350f" />
          {/* Wing covert lines */}
          <path d="M 135 98 Q 150 96 165 108" fill="none" stroke="#451a03" strokeWidth="1.2" opacity="0.5" />
          <path d="M 138 105 Q 152 103 166 114" fill="none" stroke="#451a03" strokeWidth="1.2" opacity="0.5" />
          <path d="M 140 112 Q 153 110 165 120" fill="none" stroke="#451a03" strokeWidth="1.2" opacity="0.5" />
          {/* Primary feather tips */}
          <path d="M 160 108 L 172 106 L 168 118 L 158 116 Z" fill="#451a03" opacity="0.4" />
          <path d="M 155 115 L 168 113 L 164 125 L 153 123 Z" fill="#451a03" opacity="0.4" />
          {/* Legs - slender dark */}
          <line x1="138" y1="148" x2="134" y2="172" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152" y1="148" x2="156" y2="172" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
          {/* Feet */}
          <path d="M 134 172 L 128 176 M 134 172 L 138 176 M 134 172 L 132 178" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 156 172 L 150 176 M 156 172 L 160 176 M 156 172 L 158 178" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'cardinal',
    name: 'Northern Cardinal',
    scientific: 'Cardinalis cardinalis',
    habitat: 'Shrubs, thickets, woodland edges',
    size: '25–31 cm wingspan',
    season: 'Year-round',
    description: 'The brilliant red male cardinal is one of the most striking birds you can spot in New York. They are common at backyard feeders, especially in winter when their red plumage stands out against the snow.',
    facts: [
      'Males are bright red; females are tan with red accents',
      'They mate for life and often sing in duets',
      'One of the few songbirds where both sexes sing',
    ],
    hotspots: [
      { id: 'crest', cx: 202, cy: 58, label: 'Crest', detail: 'The pointed crest on top of the head is a distinctive cardinal feature, raised when alert or excited.' },
      { id: 'mask', cx: 212, cy: 90, label: 'Black mask', detail: 'Males have a striking black mask around the beak and eyes, contrasting with the bright red face.' },
      { id: 'beak', cx: 228, cy: 94, label: 'Cone-shaped beak', detail: 'The thick, short orange beak is perfectly shaped for cracking open sunflower and safflower seeds.' },
    ],
    colors: { body: '#dc2626', bodyDark: '#991b1b', accent: '#7f1d1d', belly: '#ef4444', beak: '#f59e0b' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="card-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
          <linearGradient id="card-tail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail - long graduated */}
          <path d="M 88 118 L 42 106 L 48 128 L 56 126 L 52 140 L 62 136 L 64 146 L 72 140 L 92 130 Z" fill="url(#card-tail)" />
          {/* Body - rounded */}
          <path d="M 88 118 Q 82 88 130 82 Q 185 80 200 100 Q 200 145 155 150 Q 105 150 88 118 Z" fill="url(#card-body)" />
          {/* Breast - slightly lighter */}
          <ellipse cx="150" cy="128" rx="32" ry="24" fill="#dc2626" opacity="0.8" />
          {/* Belly darker */}
          <ellipse cx="120" cy="142" rx="16" ry="10" fill="#7f1d1d" opacity="0.4" />
          {/* Head */}
          <ellipse cx="198" cy="86" rx="24" ry="24" fill="url(#card-body)" />
          {/* Crest - prominent spiky */}
          <path d="M 192 62 Q 196 42 208 48 Q 206 58 202 66 Z" fill="#dc2626" />
          <path d="M 198 60 Q 202 44 214 52 Q 210 62 204 68 Z" fill="#ef4444" />
          <path d="M 186 64 Q 182 50 194 54 Q 190 62 188 70 Z" fill="#dc2626" />
          {/* Black mask - around face and throat */}
          <path d="M 185 84 Q 200 80 218 88 Q 222 96 214 102 Q 200 106 188 100 Q 182 92 185 84 Z" fill="#0f172a" opacity="0.88" />
          {/* Eye */}
          <circle cx="208" cy="86" r="3.5" fill="#0f172a" />
          <circle cx="209" cy="85" r="1" fill="#fff" />
          {/* Beak - thick cone-shaped orange */}
          <path d="M 220 90 L 248 88 Q 250 92 246 96 L 222 98 Z" fill="#f59e0b" />
          <path d="M 222 90 L 248 88" stroke="#d97706" strokeWidth="0.8" />
          {/* Wing - layered coverts */}
          <path className="bird-wing" d="M 125 92 Q 155 86 170 110 Q 165 134 128 130 Q 112 118 125 92 Z" fill="#991b1b" />
          {/* Wing feather detail */}
          <path d="M 132 96 Q 150 94 165 108" fill="none" stroke="#7f1d1d" strokeWidth="1.2" opacity="0.5" />
          <path d="M 135 104 Q 152 102 166 116" fill="none" stroke="#7f1d1d" strokeWidth="1.2" opacity="0.5" />
          <path d="M 138 112 Q 153 110 165 122" fill="none" stroke="#7f1d1d" strokeWidth="1.2" opacity="0.5" />
          {/* Primary feather tips */}
          <path d="M 158 108 L 170 106 L 166 120 L 156 118 Z" fill="#7f1d1d" opacity="0.5" />
          <path d="M 153 116 L 166 114 L 162 128 L 151 126 Z" fill="#7f1d1d" opacity="0.5" />
          {/* Legs */}
          <line x1="135" y1="150" x2="130" y2="172" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150" y1="150" x2="155" y2="172" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
          {/* Feet */}
          <path d="M 130 172 L 124 176 M 130 172 L 134 176 M 130 172 L 128 178" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 155 172 L 149 176 M 155 172 L 159 176 M 155 172 L 157 178" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'bluejay',
    name: 'Blue Jay',
    scientific: 'Cyanocitta cristata',
    habitat: 'Forests, parks, suburban yards',
    size: '34–43 cm wingspan',
    season: 'Year-round',
    description: 'Bold, intelligent, and noisy — Blue Jays are hard to miss. Their brilliant blue plumage and loud calls make them a favorite at backyard feeders. They are known to mimic hawk calls to scare other birds away from food.',
    facts: [
      'Can mimic the calls of hawks',
      'Highly intelligent — will cache food for later',
      'The blue color is structural, not from pigment',
    ],
    hotspots: [
      { id: 'crest', cx: 198, cy: 56, label: 'Blue crest', detail: 'The prominent crest can be raised or lowered depending on the bird\'s mood — raised when alert or aggressive.' },
      { id: 'bars', cx: 135, cy: 112, label: 'Wing bars', detail: 'The distinctive black-and-white barring pattern on the wings and tail is a key identifier.' },
      { id: 'necklace', cx: 195, cy: 100, label: 'Black necklace', detail: 'A black band crosses the throat and upper breast, connecting across the white face — unique to Blue Jays.' },
    ],
    colors: { body: '#2563eb', bodyDark: '#1e40af', accent: '#1e3a8a', belly: '#dbeafe', beak: '#1e293b' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="bj-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </radialGradient>
          <linearGradient id="bj-tail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail with white tips */}
          <path d="M 88 118 L 46 108 L 52 130 L 58 128 L 54 138 L 62 134 L 92 130 Z" fill="url(#bj-tail)" />
          {/* White tail tip spots */}
          <rect x="46" y="108" width="6" height="4" fill="#dbeafe" opacity="0.7" />
          <rect x="52" y="110" width="5" height="4" fill="#dbeafe" opacity="0.6" />
          {/* Body */}
          <path d="M 88 118 Q 82 88 130 82 Q 185 80 200 100 Q 200 145 155 150 Q 105 150 88 118 Z" fill="url(#bj-body)" />
          {/* White breast */}
          <path d="M 115 105 Q 140 100 175 108 Q 180 132 145 142 Q 120 138 115 105 Z" fill="#dbeafe" opacity="0.65" />
          {/* Head */}
          <ellipse cx="196" cy="86" rx="24" ry="23" fill="url(#bj-body)" />
          {/* Crest - prominent, multi-feather */}
          <path d="M 188 64 Q 192 40 204 46 Q 206 56 200 66 Z" fill="#2563eb" />
          <path d="M 196 62 Q 202 42 214 50 Q 210 60 204 68 Z" fill="#3b82f6" />
          <path d="M 204 60 Q 210 44 220 54 Q 214 64 208 68 Z" fill="#2563eb" />
          {/* White face */}
          <path d="M 185 84 Q 196 80 210 86 Q 214 96 206 102 Q 192 104 185 94 Z" fill="#eff6ff" opacity="0.85" />
          {/* Eye */}
          <circle cx="202" cy="86" r="3.5" fill="#0f172a" />
          <circle cx="203" cy="85" r="1" fill="#fff" />
          {/* Black necklace - bridging face to breast */}
          <path d="M 180 98 Q 195 104 212 100" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 185 104 Q 198 110 210 106" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {/* Beak - dark slate */}
          <path d="M 214 90 L 240 92 Q 242 95 238 97 L 218 98 Z" fill="#1e293b" />
          {/* Wing with barring pattern */}
          <path className="bird-wing" d="M 122 92 Q 152 86 168 108 Q 164 132 126 128 Q 110 116 122 92 Z" fill="#1e40af" />
          {/* Wing covert bars - blue/white alternating */}
          <path d="M 128 96 Q 146 94 162 106" fill="none" stroke="#0f172a" strokeWidth="1.5" opacity="0.5" />
          <path d="M 130 102 Q 148 100 164 112" fill="none" stroke="#0f172a" strokeWidth="1.5" opacity="0.5" />
          <path d="M 132 108 Q 150 106 165 118" fill="none" stroke="#0f172a" strokeWidth="1.5" opacity="0.5" />
          {/* White wing spot */}
          <ellipse cx="150" cy="104" rx="5" ry="3" fill="#dbeafe" opacity="0.7" />
          <ellipse cx="142" cy="112" rx="4" ry="2.5" fill="#dbeafe" opacity="0.6" />
          {/* Primary feather tips - dark blue */}
          <path d="M 158 106 L 170 104 L 166 118 L 156 116 Z" fill="#1e3a8a" opacity="0.5" />
          <path d="M 153 114 L 166 112 L 162 126 L 151 124 Z" fill="#1e3a8a" opacity="0.5" />
          {/* Legs */}
          <line x1="135" y1="150" x2="130" y2="172" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150" y1="150" x2="155" y2="172" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          {/* Feet */}
          <path d="M 130 172 L 124 176 M 130 172 L 134 176 M 130 172 L 128 178" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 155 172 L 149 176 M 155 172 L 159 176 M 155 172 L 157 178" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'sparrow',
    name: 'House Sparrow',
    scientific: 'Passer domesticus',
    habitat: 'Cities, towns, buildings',
    size: '19–25 cm wingspan',
    season: 'Year-round',
    description: 'The ultimate city bird. House Sparrows thrive in urban environments across New York, nesting in building crevices and foraging on sidewalks. Males have a distinctive gray cap and black bib; females are plain brown.',
    facts: [
      'Introduced to North America from Europe in the 1850s',
      'One of the most abundant birds in NYC',
      'Nests in building crevices, signs, and street lights',
    ],
    hotspots: [
      { id: 'bib', cx: 202, cy: 96, label: 'Black bib', detail: 'Males have a distinctive black patch under the chin called a "bib" — larger and darker in dominant males.' },
      { id: 'cap', cx: 195, cy: 70, label: 'Gray cap', detail: 'The pale gray crown on top of the head is a key male feature, contrasting with the brown cheeks.' },
      { id: 'cheek', cx: 180, cy: 92, label: 'Chestnut cheek', detail: 'A warm chestnut-brown patch behind the eye distinguishes males from the plainer females.' },
    ],
    colors: { body: '#92400e', bodyDark: '#78350f', accent: '#451a03', belly: '#d6d3d1', beak: '#1c1917' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="sparrow-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
          <linearGradient id="sparrow-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail - short notched */}
          <path d="M 98 118 L 66 110 L 72 128 L 78 126 L 76 134 L 84 130 L 102 126 Z" fill="#451a03" />
          {/* Body - compact and round */}
          <path d="M 92 118 Q 88 90 130 84 Q 180 82 195 98 Q 195 142 150 148 Q 105 148 92 118 Z" fill="url(#sparrow-body)" />
          {/* Streaked breast/belly */}
          <path d="M 115 105 Q 140 100 170 106 Q 175 128 140 140 Q 118 136 115 105 Z" fill="#d6d3d1" opacity="0.45" />
          {/* Breast streaks */}
          <path d="M 120 112 L 124 120" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
          <path d="M 128 110 L 132 122" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
          <path d="M 136 108 L 140 122" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
          <path d="M 144 110 L 148 124" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
          {/* Head */}
          <ellipse cx="194" cy="88" rx="22" ry="21" fill="#a16207" />
          {/* Gray cap */}
          <path d="M 174 72 Q 194 60 214 72 Q 210 82 194 78 Q 180 80 174 72 Z" fill="#d6d3d1" />
          {/* Gray cap edge - darker line */}
          <path d="M 174 72 Q 194 62 214 72" fill="none" stroke="#a8a29e" strokeWidth="1" opacity="0.6" />
          {/* Chestnut cheek patch */}
          <path d="M 174 84 Q 182 88 188 96 Q 180 100 174 94 Z" fill="#92400e" opacity="0.7" />
          {/* Black bib - throat */}
          <path d="M 190 92 Q 202 94 210 102 Q 200 112 192 110 Q 186 102 190 92 Z" fill="#1c1917" />
          {/* Eye */}
          <circle cx="200" cy="84" r="3" fill="#0f172a" />
          <circle cx="201" cy="83" r="0.8" fill="#fff" />
          {/* Beak - short conical dark */}
          <path d="M 214 88 L 232 90 Q 233 92 230 94 L 216 95 Z" fill="#1c1917" />
          {/* Wing with feather detailing */}
          <path className="bird-wing" d="M 122 96 Q 148 90 160 112 Q 156 132 124 128 Q 108 116 122 96 Z" fill="url(#sparrow-wing)" />
          {/* Wing covert lines */}
          <path d="M 128 100 Q 142 98 156 110" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.5" />
          <path d="M 130 106 Q 144 104 157 116" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.5" />
          <path d="M 132 112 Q 145 110 157 120" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.5" />
          {/* White wing bar */}
          <ellipse cx="146" cy="104" rx="6" ry="2" fill="#d6d3d1" opacity="0.5" />
          {/* Legs - pinkish brown */}
          <line x1="138" y1="146" x2="134" y2="168" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="150" y1="146" x2="154" y2="168" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
          {/* Feet */}
          <path d="M 134 168 L 128 172 M 134 168 L 138 172 M 134 168 L 132 174" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
          <path d="M 154 168 L 148 172 M 154 168 L 158 172 M 154 168 L 156 174" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'pigeon',
    name: 'Rock Pigeon',
    scientific: 'Columba livia',
    habitat: 'City streets, parks, bridges',
    size: '50–60 cm wingspan',
    season: 'Year-round',
    description: 'The quintessential New York City bird. Flocks of pigeons are a fixture on sidewalks, in parks, and under bridges throughout the city. Originally cliff-dwellers, they adapted city buildings as substitute cliffs for nesting.',
    facts: [
      'Domesticated thousands of years ago from wild rock doves',
      'Can recognize individual human faces',
      'NYC has an estimated 500,000+ pigeons',
    ],
    hotspots: [
      { id: 'neck', cx: 182, cy: 86, label: 'Iridescent neck', detail: 'The neck feathers show iridescent purple and green shimmer in sunlight — more visible in males.' },
      { id: 'wing', cx: 135, cy: 115, label: 'Wing bars', detail: 'Two dark bars on the wings are the classic pigeon marking, though city pigeons vary widely in color.' },
      { id: 'cere', cx: 212, cy: 90, label: 'Cere', detail: 'The fleshy white patch above the beak, called the cere, is more prominent in males and used in courtship displays.' },
    ],
    colors: { body: '#6b7280', bodyDark: '#4b5563', accent: '#374151', belly: '#9ca3af', beak: '#d4d4d8' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="pig-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#4b5563" />
          </radialGradient>
          <linearGradient id="pig-neck" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#6d28d9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="pig-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail - medium length */}
          <path d="M 76 122 L 38 116 L 44 138 L 50 136 L 48 146 L 58 140 L 82 134 Z" fill="#374151" />
          {/* Body - plump and full */}
          <path d="M 80 125 Q 72 88 130 82 Q 190 82 205 100 Q 205 150 155 158 Q 95 158 80 125 Z" fill="url(#pig-body)" />
          {/* Breast - lighter */}
          <path d="M 120 105 Q 150 100 185 108 Q 190 138 150 148 Q 120 140 120 105 Z" fill="#9ca3af" opacity="0.5" />
          {/* Iridescent neck - more detailed */}
          <path d="M 168 78 Q 185 72 200 82 Q 200 96 185 100 Q 170 96 168 78 Z" fill="url(#pig-neck)" />
          {/* Iridescent feather shimmer lines */}
          <path d="M 172 82 Q 180 80 188 84" fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4" />
          <path d="M 174 88 Q 182 86 190 90" fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0.4" />
          <path d="M 176 94 Q 184 92 192 96" fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
          {/* Head - small rounded */}
          <ellipse cx="200" cy="90" rx="20" ry="19" fill="#6b7280" />
          {/* Eye - orange-red iris */}
          <circle cx="206" cy="86" r="4" fill="#f97316" />
          <circle cx="206" cy="86" r="2.5" fill="#0f172a" />
          <circle cx="207" cy="85" r="0.8" fill="#fff" />
          {/* Eye ring - bare skin */}
          <circle cx="206" cy="86" r="5" fill="none" stroke="#fca5a5" strokeWidth="0.8" opacity="0.5" />
          {/* Cere - fleshy white patch above beak */}
          <path d="M 208 82 Q 216 80 218 84 Q 216 88 210 88 Z" fill="#f3f4f6" opacity="0.8" />
          {/* Beak - dark with pale tip */}
          <path d="M 216 90 L 238 92 Q 240 95 236 97 L 218 98 Z" fill="#d4d4d8" />
          <path d="M 216 90 L 238 92" stroke="#9ca3af" strokeWidth="0.8" />
          {/* Wing - detailed feather layers */}
          <path className="bird-wing" d="M 112 100 Q 148 92 168 118 Q 162 142 122 138 Q 100 124 112 100 Z" fill="url(#pig-wing)" />
          {/* Wing covert lines */}
          <path d="M 120 104 Q 140 100 160 116" fill="none" stroke="#1f2937" strokeWidth="1.2" opacity="0.5" />
          <path d="M 122 112 Q 142 108 162 122" fill="none" stroke="#1f2937" strokeWidth="1.2" opacity="0.5" />
          {/* Two dark wing bars */}
          <path d="M 118 108 Q 140 104 162 118" fill="none" stroke="#1f2937" strokeWidth="2.5" opacity="0.6" />
          <path d="M 120 116 Q 142 112 162 126" fill="none" stroke="#1f2937" strokeWidth="2.5" opacity="0.6" />
          {/* Primary feather tips */}
          <path d="M 156 116 L 168 114 L 164 130 L 154 128 Z" fill="#1f2937" opacity="0.4" />
          <path d="M 150 124 L 162 122 L 158 138 L 148 136 Z" fill="#1f2937" opacity="0.4" />
          {/* Legs - pinkish-red */}
          <line x1="135" y1="156" x2="130" y2="178" stroke="#e0311d" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="152" y1="156" x2="157" y2="178" stroke="#e0311d" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {/* Feet */}
          <path d="M 130 178 L 124 182 M 130 178 L 134 182 M 130 178 L 128 184" stroke="#e0311d" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M 157 178 L 151 182 M 157 178 L 161 182 M 157 178 L 159 184" stroke="#e0311d" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>
    ),
  },
  {
    id: 'redtail',
    name: 'Red-tailed Hawk',
    scientific: 'Buteo jamaicensis',
    habitat: 'Open fields, parks, city buildings',
    size: '110–145 cm wingspan',
    season: 'Year-round',
    description: 'A powerful raptor that has adapted remarkably well to New York City. Pale Male, a famous red-tailed hawk, nested on a Fifth Avenue apartment building for decades. These hawks are often seen soaring over parks or perched on lampposts.',
    facts: [
      'Pale Male famously nested on a NYC luxury apartment for 30+ years',
      'Their raspy scream is used as the sound effect for eagles in movies',
      'Can spot a mouse from 30 meters in the air',
    ],
    hotspots: [
      { id: 'tail', cx: 72, cy: 122, label: 'Red tail', detail: 'The distinctive rusty-red tail is the hawk\'s namesake — visible when soaring or perched.' },
      { id: 'belly', cx: 150, cy: 128, label: 'Belly band', detail: 'A streaked dark band across the pale belly helps identify red-tails in flight.' },
      { id: 'beak', cx: 228, cy: 90, label: 'Hooked beak', detail: 'The sharply hooked beak is built for tearing flesh — a hallmark of raptors.' },
    ],
    colors: { body: '#78350f', bodyDark: '#451a03', accent: '#b91c1c', belly: '#d6d3d1', beak: '#fbbf24' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="hawk-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <linearGradient id="hawk-tail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="hawk-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
        <g>
          {/* Red tail - broad with bands */}
          <path d="M 88 118 L 38 108 L 42 142 L 50 140 L 48 150 L 58 144 L 92 138 Z" fill="url(#hawk-tail)" />
          {/* Tail band lines */}
          <path d="M 42 120 L 88 126" fill="none" stroke="#450a0a" strokeWidth="1.5" opacity="0.4" />
          <path d="M 44 130 L 90 134" fill="none" stroke="#450a0a" strokeWidth="1.5" opacity="0.4" />
          {/* Body - large and broad */}
          <path d="M 88 120 Q 80 85 135 80 Q 195 78 210 100 Q 210 150 160 155 Q 100 155 88 120 Z" fill="url(#hawk-body)" />
          {/* Pale breast */}
          <path d="M 120 105 Q 150 100 185 108 Q 190 135 150 145 Q 122 138 120 105 Z" fill="#d6d3d1" opacity="0.5" />
          {/* Belly band - streaked dark */}
          <path d="M 130 122 Q 155 128 180 122" fill="none" stroke="#451a03" strokeWidth="3" opacity="0.55" />
          <line x1="138" y1="128" x2="142" y2="140" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          <line x1="150" y1="130" x2="154" y2="142" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          <line x1="162" y1="128" x2="166" y2="140" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          <line x1="172" y1="125" x2="176" y2="136" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          {/* Head */}
          <ellipse cx="204" cy="84" rx="22" ry="21" fill="#78350f" />
          {/* Hooked beak - raptor style */}
          <path d="M 222 86 L 244 88 Q 246 92 240 95 Q 234 94 224 94 Z" fill="#fbbf24" />
          <path d="M 238 90 Q 244 92 242 96" fill="none" stroke="#92400e" strokeWidth="1" />
          {/* Hook tip */}
          <path d="M 240 95 Q 244 96 242 98" fill="none" stroke="#451a03" strokeWidth="1" strokeLinecap="round" />
          {/* Eye - fierce with pale iris */}
          <circle cx="208" cy="80" r="5.5" fill="#fef3c7" />
          <circle cx="208" cy="80" r="4" fill="#1a0a00" />
          <circle cx="209" cy="79" r="1.2" fill="#fff" />
          {/* Brow ridge - heavy */}
          <path d="M 196 72 Q 208 68 218 74" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          {/* Cere - fleshy base of beak */}
          <ellipse cx="222" cy="84" rx="6" ry="3" fill="#fbbf24" opacity="0.5" />
          {/* Wing - broad and powerful */}
          <path className="bird-wing" d="M 120 92 Q 155 85 172 112 Q 166 138 126 134 Q 105 120 120 92 Z" fill="url(#hawk-wing)" />
          {/* Wing covert lines */}
          <path d="M 128 96 Q 148 92 166 108" fill="none" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          <path d="M 130 104 Q 150 100 168 116" fill="none" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          <path d="M 132 112 Q 152 108 168 122" fill="none" stroke="#451a03" strokeWidth="1.5" opacity="0.5" />
          {/* Primary feather tips - dark */}
          <path d="M 158 108 L 172 106 L 168 122 L 156 120 Z" fill="#451a03" opacity="0.5" />
          <path d="M 152 116 L 168 114 L 164 130 L 150 128 Z" fill="#451a03" opacity="0.5" />
          {/* Talons - powerful curved claws */}
          <path d="M 135 152 Q 132 162 128 168 Q 126 172 130 174 Q 134 172 136 168" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
          <path d="M 135 152 Q 138 162 142 168 Q 144 172 140 174 Q 136 172 134 168" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
          <path d="M 152 152 Q 149 162 145 168 Q 143 172 147 174 Q 151 172 153 168" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
          <path d="M 152 152 Q 155 162 159 168 Q 161 172 157 174 Q 153 172 151 168" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: 'starling',
    name: 'European Starling',
    scientific: 'Sturnus vulgaris',
    habitat: 'Cities, parks, farmland',
    size: '31–40 cm wingspan',
    season: 'Year-round',
    description: 'All 200 million North American starlings descend from 60 birds released in Central Park in 1890 by Shakespeare enthusiasts. In breeding plumage they are iridescent purple-green with yellow beaks; in winter they turn spotted brown.',
    facts: [
      'Introduced to NYC in 1890 by a Shakespeare fan club',
      'Can mimic over 20 different bird species\' calls',
      'Forms massive swirling flocks called murmurations',
    ],
    hotspots: [
      { id: 'plumage', cx: 145, cy: 115, label: 'Iridescent plumage', detail: 'Breeding adults shimmer with purple and green iridescence. In winter, white tips create a spotted look.' },
      { id: 'beak', cx: 218, cy: 92, label: 'Seasonal beak', detail: 'The beak turns bright yellow during breeding season and darkens to almost black in winter.' },
      { id: 'legs', cx: 145, cy: 165, label: 'Pink legs', detail: 'Starlings have distinctive reddish-pink legs, unlike most dark-plumaged songbirds.' },
    ],
    colors: { body: '#1e1b4b', bodyDark: '#0f0a26', accent: '#4c1d95', belly: '#312e81', beak: '#fbbf24' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="star-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0a26" />
          </radialGradient>
          <linearGradient id="star-irid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="star-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0a26" />
          </linearGradient>
        </defs>
        <g>
          {/* Tail - short triangular */}
          <path d="M 92 120 L 62 112 L 66 132 L 72 130 L 70 138 L 78 134 L 96 130 Z" fill="#0f0a26" />
          {/* Body - stocky and squat */}
          <path d="M 90 120 Q 84 90 130 84 Q 180 82 195 100 Q 195 145 150 152 Q 100 150 90 120 Z" fill="url(#star-body)" />
          {/* Iridescent sheen overlay */}
          <path d="M 100 100 Q 140 95 180 102 Q 185 125 145 135 Q 110 130 100 100 Z" fill="url(#star-irid)" />
          {/* Iridescent feather shimmer lines */}
          <path d="M 108 104 Q 120 102 132 106" fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
          <path d="M 112 112 Q 124 110 136 114" fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0.3" />
          <path d="M 116 120 Q 128 118 140 122" fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.25" />
          {/* Winter spotting - white feather tips */}
          <circle cx="115" cy="108" r="1.5" fill="#e0e7ff" opacity="0.4" />
          <circle cx="128" cy="112" r="1.5" fill="#e0e7ff" opacity="0.35" />
          <circle cx="140" cy="116" r="1.5" fill="#e0e7ff" opacity="0.4" />
          <circle cx="125" cy="122" r="1.5" fill="#e0e7ff" opacity="0.35" />
          <circle cx="138" cy="126" r="1.5" fill="#e0e7ff" opacity="0.3" />
          <circle cx="150" cy="120" r="1.5" fill="#e0e7ff" opacity="0.35" />
          {/* Head - rounded */}
          <ellipse cx="196" cy="88" rx="22" ry="20" fill="#1e1b4b" />
          {/* Iridescent head sheen */}
          <ellipse cx="190" cy="82" rx="14" ry="10" fill="url(#star-irid)" opacity="0.6" />
          {/* Eye - dark with subtle iris */}
          <circle cx="202" cy="84" r="3.5" fill="#0a0a0a" />
          <circle cx="203" cy="83" r="1" fill="#a78bfa" opacity="0.4" />
          {/* Beak - yellow breeding color, sharp pointed */}
          <path d="M 214 88 L 238 88 Q 240 90 238 93 L 216 95 Z" fill="#fbbf24" />
          <path d="M 214 88 L 238 88" stroke="#d97706" strokeWidth="0.8" />
          {/* Beak base - darker */}
          <path d="M 214 88 Q 216 92 214 95" fill="none" stroke="#92400e" strokeWidth="0.8" />
          {/* Wing - pointed triangular shape */}
          <path className="bird-wing" d="M 118 96 Q 148 90 162 110 Q 158 134 124 130 Q 106 118 118 96 Z" fill="url(#star-wing)" />
          {/* Wing iridescent sheen */}
          <path d="M 122 100 Q 145 96 158 112" fill="none" stroke="#6d28d9" strokeWidth="1" opacity="0.3" />
          {/* Wing covert lines */}
          <path d="M 124 104 Q 142 100 157 114" fill="none" stroke="#0f0a26" strokeWidth="1.2" opacity="0.5" />
          <path d="M 126 110 Q 144 106 158 120" fill="none" stroke="#0f0a26" strokeWidth="1.2" opacity="0.5" />
          <path d="M 128 116 Q 146 112 159 124" fill="none" stroke="#0f0a26" strokeWidth="1.2" opacity="0.5" />
          {/* Primary feather tips - very dark */}
          <path d="M 152 110 L 162 108 L 158 122 L 148 120 Z" fill="#0f0a26" opacity="0.6" />
          <path d="M 146 118 L 158 116 L 154 130 L 142 128 Z" fill="#0f0a26" opacity="0.6" />
          {/* Legs - pinkish-red */}
          <line x1="138" y1="148" x2="134" y2="168" stroke="#e0311d" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          <line x1="150" y1="148" x2="154" y2="168" stroke="#e0311d" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          {/* Feet */}
          <path d="M 134 168 L 128 172 M 134 168 L 138 172 M 134 168 L 132 174" stroke="#e0311d" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <path d="M 154 168 L 148 172 M 154 168 L 158 172 M 154 168 L 156 174" stroke="#e0311d" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        </g>
      </svg>
    ),
  },
  {
    id: 'mockingbird',
    name: 'Northern Mockingbird',
    scientific: 'Mimus polyglottos',
    habitat: 'Shrubs, parks, suburban yards',
    size: '33–38 cm wingspan',
    season: 'Year-round',
    description: 'The master mimic of the bird world. Mockingbirds can learn and repeat the songs of dozens of other bird species, as well as frogs, insects, and even car alarms. They sing relentlessly, sometimes day and night.',
    facts: [
      'Can learn over 200 different song phrases',
      'Sings day and night, especially unmated males',
      'Will aggressively dive-bomb cats, dogs, and humans near their nest',
    ],
    hotspots: [
      { id: 'wingpatch', cx: 140, cy: 112, label: 'White wing patch', detail: 'Large white patches on the wings flash conspicuously in flight — used in courtship displays and to startle insects.' },
      { id: 'tail', cx: 75, cy: 122, label: 'White tail edges', detail: 'The long tail has white outer feathers that are flashed in display and flight, contrasting with the gray body.' },
      { id: 'eye', cx: 206, cy: 84, label: 'Yellow eye', detail: 'Adults have a pale yellow to whitish iris that distinguishes them from similar-looking gray birds.' },
    ],
    colors: { body: '#94a3b8', bodyDark: '#64748b', accent: '#475569', belly: '#e2e8f0', beak: '#1c1917' },
    svg: (active) => (
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <radialGradient id="mock-body" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <linearGradient id="mock-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="mock-tail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
        <g>
          {/* Long tail with white outer edges */}
          <path d="M 88 120 L 42 110 L 48 134 L 54 132 L 52 144 L 62 138 L 92 132 Z" fill="url(#mock-tail)" />
          {/* White outer tail feathers - more prominent */}
          <path d="M 42 110 L 48 134 L 54 132 L 52 142 L 48 128 L 44 112 Z" fill="#f1f5f9" opacity="0.8" />
          <path d="M 88 130 L 52 142 L 58 138 L 92 130 Z" fill="#f1f5f9" opacity="0.5" />
          {/* Body - slender and long */}
          <path d="M 88 120 Q 82 88 132 82 Q 185 80 200 100 Q 200 148 155 154 Q 100 152 88 120 Z" fill="url(#mock-body)" />
          {/* Pale breast/belly */}
          <path d="M 115 104 Q 145 100 178 106 Q 182 132 145 142 Q 118 136 115 104 Z" fill="#e2e8f0" opacity="0.5" />
          {/* Subtle breast streaks */}
          <path d="M 125 112 L 128 120" stroke="#64748b" strokeWidth="0.7" opacity="0.3" />
          <path d="M 135 110 L 138 122" stroke="#64748b" strokeWidth="0.7" opacity="0.3" />
          <path d="M 145 112 L 148 124" stroke="#64748b" strokeWidth="0.7" opacity="0.3" />
          {/* Head - relatively small */}
          <ellipse cx="200" cy="86" rx="22" ry="20" fill="url(#mock-body)" />
          {/* Pale face - subtle */}
          <path d="M 190 82 Q 200 78 210 84 Q 210 92 200 94 Q 192 90 190 82 Z" fill="#e2e8f0" opacity="0.3" />
          {/* Eye - pale yellow iris */}
          <circle cx="206" cy="84" r="4" fill="#fef3c7" />
          <circle cx="206" cy="84" r="2.5" fill="#0f172a" />
          <circle cx="207" cy="83" r="0.8" fill="#fff" />
          {/* Beak - slender, slightly curved, dark */}
          <path d="M 218 88 L 242 90 Q 244 92 240 94 L 220 95 Z" fill="#1c1917" />
          <path d="M 218 88 L 242 90" stroke="#0f172a" strokeWidth="0.8" />
          {/* Wing with large white patch */}
          <path className="bird-wing" d="M 118 94 Q 150 88 164 110 Q 160 134 124 130 Q 104 116 118 94 Z" fill="url(#mock-wing)" />
          {/* Wing covert lines */}
          <path d="M 124 98 Q 144 94 160 108" fill="none" stroke="#334155" strokeWidth="1.2" opacity="0.5" />
          <path d="M 126 106 Q 146 102 161 116" fill="none" stroke="#334155" strokeWidth="1.2" opacity="0.5" />
          <path d="M 128 114 Q 148 110 162 122" fill="none" stroke="#334155" strokeWidth="1.2" opacity="0.5" />
          {/* White wing patch - large and conspicuous */}
          <path d="M 135 102 Q 148 100 158 110 Q 154 120 142 118 Q 133 112 135 102 Z" fill="#f1f5f9" opacity="0.75" />
          {/* White wing bar - second patch */}
          <ellipse cx="148" cy="116" rx="8" ry="3" fill="#f1f5f9" opacity="0.5" />
          {/* Primary feather tips - dark */}
          <path d="M 154 108 L 164 106 L 160 122 L 150 120 Z" fill="#1e293b" opacity="0.5" />
          <path d="M 148 116 L 160 114 L 156 130 L 144 128 Z" fill="#1e293b" opacity="0.5" />
          {/* Legs - dark gray */}
          <line x1="138" y1="150" x2="134" y2="170" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152" y1="150" x2="156" y2="170" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
          {/* Feet */}
          <path d="M 134 170 L 128 174 M 134 170 L 138 174 M 134 170 L 132 176" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 156 170 L 150 174 M 156 170 L 160 174 M 156 170 L 158 176" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
];

const POSITIONS = [
  { x: 12, y: 18, size: 150 },
  { x: 68, y: 14, size: 140 },
  { x: 40, y: 38, size: 155 },
  { x: 82, y: 42, size: 145 },
  { x: 16, y: 65, size: 160 },
  { x: 72, y: 68, size: 150 },
  { x: 38, y: 88, size: 155 },
  { x: 78, y: 90, size: 150 },
];

export default function Birds() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeBird = BIRDS.find((b) => b.id === activeId) || null;
  const activeIndex = activeBird ? BIRDS.findIndex((b) => b.id === activeBird.id) : -1;

  const goToBird = useCallback((direction: number) => {
    if (activeIndex < 0) return;
    const next = (activeIndex + direction + BIRDS.length) % BIRDS.length;
    setActiveId(BIRDS[next].id);
    setActiveHotspot(null);
  }, [activeIndex]);

  const activeHotspotData = activeBird?.hotspots.find((h) => h.id === activeHotspot) || null;

  return (
    <div ref={sectionRef} className="relative w-full">
      <div
        className={`transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <MapPin className="w-3 h-3" />
            New York Birds
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Birds of the New York Sky
          </h2>
          <p className="mt-3 text-sky-100/60 leading-relaxed max-w-lg mx-auto">
            From city streets to park treetops — click any bird to learn about the species you can spot across New York.
          </p>
        </div>

        {/* Interactive sky scene */}
        <div
          className="relative w-full max-w-5xl mx-auto"
          style={{ height: '540px' }}
        >
          {/* Floating bird cards */}
          {BIRDS.map((bird, i) => {
            const isHovered = hoveredId === bird.id;
            const isSelected = activeId === bird.id;
            const pos = POSITIONS[i];
            return (
              <div
                key={bird.id}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: `min(${pos.size}px, 42vw)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  style={{
                    animation: `cloud-float-${i} ${7 + i * 0.7}s ease-in-out infinite alternate`,
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveId(bird.id);
                      setActiveHotspot(null);
                    }}
                    onMouseEnter={() => setHoveredId(bird.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="block w-full transition-all duration-300 group relative"
                    style={{
                      transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                      filter: isHovered || isSelected
                        ? 'drop-shadow(0 4px 24px rgba(255,255,255,0.25))'
                        : 'drop-shadow(0 2px 10px rgba(0,0,0,0.15))',
                      opacity: 1,
                      transition: 'filter 0.3s, transform 0.3s',
                    }}
                  >
                    <div className="aspect-[3/2]">{bird.svg(isHovered || isSelected)}</div>
                    {/* Name tag on hover */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -bottom-1 whitespace-nowrap transition-all duration-200"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                      }}
                    >
                      <div className="px-2.5 py-1 rounded-full bg-sky-900/80 border border-sky-400/40 text-xs font-medium text-sky-200 backdrop-blur-sm">
                        {bird.name}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Hint */}
          {!activeId && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs text-sky-200/50 animate-pulse">
                Hover to identify — click to explore
              </p>
            </div>
          )}
        </div>

        {/* Detail modal */}
        {activeBird && (
          <>
            <div
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => {
                setActiveId(null);
                setActiveHotspot(null);
              }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div
                className="relative w-full max-w-3xl rounded-3xl border border-sky-400/30 bg-sky-950/95 backdrop-blur-xl p-6 sm:p-8 pointer-events-auto"
                style={{ animation: 'submarine-panel-in 0.3s ease-out' }}
              >
                <button
                  onClick={() => {
                    setActiveId(null);
                    setActiveHotspot(null);
                  }}
                  className="absolute top-4 right-4 text-sky-300/60 hover:text-sky-200 transition z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation */}
                <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                  <button
                    onClick={() => goToBird(-1)}
                    className="p-1.5 rounded-lg bg-sky-900/60 border border-sky-700/50 text-sky-300 hover:bg-sky-800/60 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToBird(1)}
                    className="p-1.5 rounded-lg bg-sky-900/60 border border-sky-700/50 text-sky-300 hover:bg-sky-800/60 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Interactive bird view */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl p-4">
                      <div className="aspect-[3/2] relative">
                        {activeBird.svg(true)}

                        {/* Hotspots */}
                        {activeBird.hotspots.map((spot) => {
                          const isActive = activeHotspot === spot.id;
                          return (
                            <div
                              key={spot.id}
                              className="absolute"
                              style={{
                                left: `${(spot.cx / 300) * 100}%`,
                                top: `${(spot.cy / 200) * 100}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <button
                                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                                className="relative flex items-center justify-center"
                                style={{ width: '28px', height: '28px' }}
                              >
                                <span
                                  className="absolute rounded-full border-2"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    borderColor: isActive ? '#38bdf8' : 'rgba(56,189,248,0.5)',
                                    animation: 'hotspot-pulse 2s ease-out infinite',
                                  }}
                                />
                                <span
                                  className="rounded-full transition-all"
                                  style={{
                                    width: isActive ? '12px' : '10px',
                                    height: isActive ? '12px' : '10px',
                                    background: isActive ? '#38bdf8' : 'rgba(56,189,248,0.7)',
                                    boxShadow: isActive ? '0 0 12px #38bdf8' : '0 0 6px rgba(56,189,248,0.5)',
                                  }}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Stats */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-sky-950/50 border border-sky-800/40 px-3 py-2">
                          <span className="text-sky-400/70 block">Habitat</span>
                          <span className="text-sky-100/80">{activeBird.habitat}</span>
                        </div>
                        <div className="rounded-lg bg-sky-950/50 border border-sky-800/40 px-3 py-2">
                          <span className="text-sky-400/70 block">Size</span>
                          <span className="text-sky-100/80">{activeBird.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hotspot chips */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activeBird.hotspots.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                            activeHotspot === spot.id
                              ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                              : 'bg-sky-950/50 border-sky-800/50 text-sky-300/60 hover:border-sky-500/40 hover:text-sky-300'
                          }`}
                        >
                          {spot.label}
                        </button>
                      ))}
                    </div>

                    {/* Hotspot detail */}
                    {activeHotspotData && (
                      <div
                        className="mt-3 rounded-xl bg-sky-500/10 border border-sky-500/20 px-4 py-3 text-sm text-sky-100/80 leading-relaxed"
                        style={{ animation: 'submarine-panel-in 0.2s ease-out' }}
                      >
                        <span className="font-medium text-sky-300">{activeHotspotData.label}: </span>
                        {activeHotspotData.detail}
                      </div>
                    )}
                  </div>

                  {/* Info panel */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white">{activeBird.name}</h3>
                      <p className="text-sm text-sky-400/70 italic mt-0.5">{activeBird.scientific}</p>
                    </div>

                    <p className="text-sm text-sky-100/70 leading-relaxed mb-5">
                      {activeBird.description}
                    </p>

                    <div className="rounded-xl bg-sky-950/50 border border-sky-800/40 px-4 py-3 mb-5">
                      <div className="flex items-center gap-2 text-xs text-sky-300/70">
                        <span className="font-mono text-sky-400">{activeBird.season}</span>
                      </div>
                    </div>

                    <div className="mt-auto space-y-2">
                      <h4 className="text-xs font-semibold text-sky-400/80 uppercase tracking-wider">Did you know?</h4>
                      <ul className="space-y-2">
                        {activeBird.facts.map((fact, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-sky-100/60">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400/60 flex-shrink-0" />
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bird navigation dots */}
                <div className="flex justify-center gap-2 mt-6 pt-5 border-t border-sky-800/50">
                  {BIRDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setActiveId(b.id);
                        setActiveHotspot(null);
                      }}
                      className={`transition-all rounded-full ${
                        b.id === activeId
                          ? 'w-6 h-2 bg-sky-400'
                          : 'w-2 h-2 bg-sky-700/50 hover:bg-sky-600/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
