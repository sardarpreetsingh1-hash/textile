import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Fallback data in case the backend server is temporarily starting up
const fallbackProducts = [
  {
    _id: 'fb_1',
    sku: 'TX-902-AER',
    name: 'AeroCarbon 3D Interlock Composite Weave',
    category: 'Aerospace Composites',
    description: 'Ultra-high-modulus carbon filament engineered with triaxial interlock weaving for aerospace fuselage skins, lightweight structural nacelles, and hypercar monocoques.',
    composition: '82% Toray T800 Carbon Fiber, 18% Thermoplastic PEEK Matrix',
    weightGsm: 420,
    widthCm: 150,
    rollLengthM: 100,
    tensileStrengthMpa: 3450,
    abrasionMartindale: 250000,
    flameCertification: 'FAR 25.853 (Aviation Vertical Flammability Compliant)',
    certifications: ['ISO 9001:2015', 'AS9100D Aerospace Standard', 'REACH Compliant'],
    leadTimeWeeks: 2,
    pricePerMeter: 145.00,
    moqMeters: 50,
    inStock: true,
    stockMeters: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Raw Carbon Black', hex: '#121212' },
      { name: 'Matte Graphite', hex: '#2c2d30' },
      { name: 'Titanium Slate', hex: '#4a4d52' }
    ],
    technicalSpecs: {
      weavePattern: '2x2 Twill High Density',
      yarnCount: '12K Carbon Filament (800 tex)',
      airPermeability: '0.02 L/m²/s at 100Pa',
      thermalConductivity: '1.2 W/m·K',
      acousticNrc: '0.45'
    },
    isFeatured: true
  },
  {
    _id: 'fb_2',
    sku: 'TX-740-ACO',
    name: 'AcoustiWeave Wool Felt Architectural Partition',
    category: 'Architectural Acoustic',
    description: 'Heavyweight felted worsted wool jacquard engineered for concert halls, luxury boardroom wall treatments, and reverberation control in modernist architecture.',
    composition: '90% New Zealand Virgin Wool, 10% Recycled Technical Polyamide',
    weightGsm: 680,
    widthCm: 160,
    rollLengthM: 40,
    tensileStrengthMpa: 820,
    abrasionMartindale: 110000,
    flameCertification: 'EN 13501-1 Class B-s1, d0 / ASTM E84 Class A',
    certifications: ['OEKO-TEX Standard 100', 'Cradle to Cradle Certified', 'EU Ecolabel'],
    leadTimeWeeks: 3,
    pricePerMeter: 89.50,
    moqMeters: 25,
    inStock: true,
    stockMeters: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Limestone Chalk', hex: '#e8e5e0' },
      { name: 'Basalt Charcoal', hex: '#2d2e2f' },
      { name: 'Nordic Moss', hex: '#4d543b' },
      { name: 'Warm Terracotta', hex: '#8a4b38' }
    ],
    technicalSpecs: {
      weavePattern: 'Double-Cloth Acoustic Jacquard',
      yarnCount: 'Nm 28/2 Worsted Spun',
      airPermeability: '32.5 L/m²/s',
      thermalConductivity: '0.045 W/m·K',
      acousticNrc: '0.85 (Sound Absorption Class A)'
    },
    isFeatured: true
  },
  {
    _id: 'fb_3',
    sku: 'TX-512-BAL',
    name: 'ShieldPro High-Tensile Aramid Tactical Weave',
    category: 'Protective & Ballistic',
    description: 'Continuous Kevlar filament woven on high-tension Dornier looms with fluorocarbon water-repellent and ceramic micro-particle coating.',
    composition: '95% Para-Aramid Continuous Filament, 5% Ceramic Micro-Matrix',
    weightGsm: 550,
    widthCm: 140,
    rollLengthM: 60,
    tensileStrengthMpa: 2900,
    abrasionMartindale: 300000,
    flameCertification: 'NFPA 1971 / EN 469 Flame & Heat Resistant',
    certifications: ['NATO STANAG 2920', 'ISO 13997 Blade Cut Level 5', 'MIL-SPEC Certified'],
    leadTimeWeeks: 4,
    pricePerMeter: 120.00,
    moqMeters: 100,
    inStock: true,
    stockMeters: 920,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Tactical OD Green', hex: '#3d4432' },
      { name: 'Stealth Black', hex: '#181818' },
      { name: 'Coyote Sand', hex: '#7c6d53' }
    ],
    technicalSpecs: {
      weavePattern: 'Plain High-Density Ripstop Weave',
      yarnCount: '1100 dtex Para-Aramid',
      airPermeability: '1.4 L/m²/s',
      thermalConductivity: '0.18 W/m·K',
      acousticNrc: '0.30'
    },
    isFeatured: true
  },
  {
    _id: 'fb_4',
    sku: 'TX-330-BIO',
    name: 'SilkBio-Synthetics High-Luster Contract Satin',
    category: 'Bio-Synthetic Performance',
    description: 'Precision fermented spider-silk bio-polymers interlaced with organic combed Pima cotton. Breathable, antimicrobial, with extreme tear resistance.',
    composition: '65% Fermented Bio-Polymer Silk, 35% Certified Organic GOTS Cotton',
    weightGsm: 310,
    widthCm: 145,
    rollLengthM: 75,
    tensileStrengthMpa: 1450,
    abrasionMartindale: 180000,
    flameCertification: 'BS 5852 Crib 5 / Cal 133 Commercial Contract',
    certifications: ['GOTS Certified', 'Vegan Approved', 'OEKO-TEX Eco Passport'],
    leadTimeWeeks: 2,
    pricePerMeter: 74.00,
    moqMeters: 30,
    inStock: true,
    stockMeters: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Oatmeal Natural', hex: '#f0ede6' },
      { name: 'Earthy Olive', hex: '#5f6947' },
      { name: 'Deep Indigo', hex: '#1b2a41' }
    ],
    technicalSpecs: {
      weavePattern: '8-End Satin Smooth Face',
      yarnCount: 'Nm 60/2 Micro-filament',
      airPermeability: '18.2 L/m²/s',
      thermalConductivity: '0.06 W/m·K',
      acousticNrc: '0.50'
    },
    isFeatured: true
  },
  {
    _id: 'fb_5',
    sku: 'TX-810-IND',
    name: 'VibroDamp High-Load Conveyor & Filtration Web',
    category: 'Industrial Technical',
    description: 'High-density multi-filament monofilament matrix engineered for chemical processing filtration, industrial vibration isolation, and autoclave environments.',
    composition: '100% High-Tenacity Monofilament PTFE & PPS',
    weightGsm: 890,
    widthCm: 200,
    rollLengthM: 50,
    tensileStrengthMpa: 2100,
    abrasionMartindale: 400000,
    flameCertification: 'UL 94 V-0 Self-Extinguishing',
    certifications: ['FDA Food Contact Compliant', 'ISO 14001', 'RoHS 3'],
    leadTimeWeeks: 3,
    pricePerMeter: 98.00,
    moqMeters: 50,
    inStock: true,
    stockMeters: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Industrial White', hex: '#fafafa' },
      { name: 'Conductive Slate', hex: '#3f4144' }
    ],
    technicalSpecs: {
      weavePattern: 'Calendered Dutch Twill Weave',
      yarnCount: '0.25mm PPS Monofilament',
      airPermeability: '450 L/m²/s at 200Pa',
      thermalConductivity: '0.24 W/m·K',
      acousticNrc: '0.20'
    },
    isFeatured: false
  },
  {
    _id: 'fb_6',
    sku: 'TX-605-AER',
    name: 'AeroTherm Honeycomb Core Spacer Textile',
    category: 'Aerospace Composites',
    description: '3D warp-knitted spacer fabric providing structural cushioning, thermal isolation, and air permeability for commercial aircraft cabin seats.',
    composition: '75% High-Tenacity Trevira CS, 25% Basalt Fiber Core',
    weightGsm: 520,
    widthCm: 140,
    rollLengthM: 30,
    tensileStrengthMpa: 1650,
    abrasionMartindale: 190000,
    flameCertification: 'FAR 25.853 / ABD0031 Smoke & Toxicity',
    certifications: ['EN 45545-2 HL3 (Rail Standards)', 'AIRBUS A350 Spec Approved'],
    leadTimeWeeks: 3,
    pricePerMeter: 112.00,
    moqMeters: 40,
    inStock: true,
    stockMeters: 800,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop',
    swatchColors: [
      { name: 'Aero Pewter', hex: '#878c94' },
      { name: 'Cabin Midnight', hex: '#161a24' }
    ],
    technicalSpecs: {
      weavePattern: 'Double Needle Bar Warp Knit (6mm thickness)',
      yarnCount: '167 dtex / 48f Trevira CS',
      airPermeability: '140 L/m²/s',
      thermalConductivity: '0.038 W/m·K',
      acousticNrc: '0.72'
    },
    isFeatured: false
  }
];

export const fetchProducts = async (params = {}) => {
  try {
    const res = await apiClient.get('/products', { params });
    return res.data.data;
  } catch (err) {
    console.warn('Backend offline, using fallback products:', err.message);
    let filtered = [...fallbackProducts];
    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return filtered;
  }
};

export const fetchProductByIdentifier = async (idOrSku) => {
  try {
    const res = await apiClient.get(`/products/${idOrSku}`);
    return res.data.data;
  } catch (err) {
    console.warn('Backend offline, matching fallback product:', err.message);
    return fallbackProducts.find(p => p.sku.toLowerCase() === idOrSku.toLowerCase() || p._id === idOrSku) || fallbackProducts[0];
  }
};

export const fetchOrders = async () => {
  try {
    const res = await apiClient.get('/orders');
    return res.data.data;
  } catch (err) {
    console.warn('Backend offline, returning mock orders:', err.message);
    return [];
  }
};

export const trackOrder = async (orderNumber) => {
  try {
    const res = await apiClient.get(`/orders/track/${orderNumber}`);
    return res.data.data;
  } catch (err) {
    console.warn('Backend tracking request error:', err.message);
    throw err;
  }
};

export const createOrder = async (orderData) => {
  const res = await apiClient.post('/orders', orderData);
  return res.data.data;
};

export const updateOrderStatus = async (id, status, currentStageIndex) => {
  const res = await apiClient.put(`/orders/${id}/status`, { status, currentStageIndex });
  return res.data.data;
};

export const fetchMeetings = async () => {
  try {
    const res = await apiClient.get('/meetings');
    return res.data.data;
  } catch (err) {
    console.warn('Backend meetings error:', err.message);
    return [];
  }
};

export const bookMeeting = async (meetingData) => {
  const res = await apiClient.post('/meetings', meetingData);
  return res.data.data;
};

export const fetchAvailableSlots = async (date) => {
  try {
    const res = await apiClient.get(`/meetings/slots/${date}`);
    return res.data.data;
  } catch (err) {
    const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '03:30 PM', '04:30 PM'];
    return allSlots.map(slot => ({ slot, isAvailable: true }));
  }
};

export const fetchSampleRequests = async () => {
  try {
    const res = await apiClient.get('/samples');
    return res.data.data;
  } catch (err) {
    return [];
  }
};

export const submitSampleRequest = async (sampleData) => {
  const res = await apiClient.post('/samples', sampleData);
  return res.data.data;
};

export const fetchDashboardStats = async () => {
  try {
    const res = await apiClient.get('/stats/dashboard');
    return res.data.data;
  } catch (err) {
    return {
      totalProducts: 6,
      totalOrders: 2,
      activeTransitOrders: 2,
      pendingSamples: 1,
      upcomingConsultations: 2,
      totalVolumeMeters: 4520,
      activeLooms: 18,
      totalLoomCapacityPct: 94.6,
      rawFiberIndexUsd: '+1.4%',
      energyEfficiencyGrade: 'ISO 50001 (A+)',
      carbonFootprintOffsetPct: 78.4,
    };
  }
};
