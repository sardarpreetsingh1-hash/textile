const initialProducts = [
  {
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

const initialOrders = [
  {
    orderNumber: 'TX-902-84A',
    clientName: 'Dr. Evelyn Vance',
    company: 'AeroStructure Dynamics GmbH',
    email: 'e.vance@aerostructure-dynamics.de',
    destination: 'Hangar 7, Hamburg Finkenwerder Airport, Germany',
    origin: 'Texora High-Precision Loom Mill 4, Lyon, France',
    orderDate: new Date('2024-10-28T09:30:00Z'),
    estimatedDelivery: new Date('2024-11-14T17:00:00Z'),
    status: 'Quality Check',
    currentStageIndex: 2,
    totalVolumeMeters: 450,
    totalAmountUsd: 65250.00,
    carrier: 'DHL Global Forwarding Aero Cargo',
    trackingCode: 'DH-8849-01129-EU',
    billOfLading: 'BL-TEX-99201',
    items: [
      {
        sku: 'TX-902-AER',
        name: 'AeroCarbon 3D Interlock Composite Weave (Grade A1)',
        meters: 450,
        unitPrice: 145.00
      }
    ],
    timeline: [
      {
        stage: 'Confirmed',
        date: 'Oct 28, 2024',
        time: '09:30 AM',
        location: 'Texora Central B2B Exchange',
        description: 'Purchase order verified and loom batch #4409 scheduled for production.',
        completed: true,
        active: false
      },
      {
        stage: 'Production',
        date: 'Oct 30, 2024',
        time: '14:15 PM',
        location: 'Loom Station 12, Lyon Mill',
        description: '450 meters woven at 850 picks/min under ISO cleanroom humidity controls.',
        completed: true,
        active: false
      },
      {
        stage: 'Quality Check',
        date: 'Nov 02, 2024',
        time: '11:00 AM',
        location: 'Spectrometry & Tensile Stress Lab',
        description: 'Martindale abrasion & X-ray carbon matrix tomography underway. Tensile rating: 3,460 MPa (Pass).',
        completed: false,
        active: true
      },
      {
        stage: 'Packed',
        date: 'Est. Nov 05, 2024',
        time: '--:--',
        location: 'Cleanroom Packaging Bay 2',
        description: 'Sealed in nitrogen-flushed anti-static vacuum barrier film.',
        completed: false,
        active: false
      },
      {
        stage: 'In Transit',
        date: 'Est. Nov 08, 2024',
        time: '--:--',
        location: 'Air Freight Freightway Terminal',
        description: 'Dispatched via DHL Temperature-Controlled Express Logistics.',
        completed: false,
        active: false
      },
      {
        stage: 'Customs Cleared',
        date: 'Est. Nov 12, 2024',
        time: '--:--',
        location: 'Frankfurt Hub / Hamburg Port',
        description: 'Customs tariff verification & aerospace declaration clearance.',
        completed: false,
        active: false
      },
      {
        stage: 'Delivered',
        date: 'Est. Nov 14, 2024',
        time: '--:--',
        location: 'Hamburg Finkenwerder',
        description: 'Final delivery inspection and transfer of custody.',
        completed: false,
        active: false
      }
    ],
    telemetry: {
      currentTemperatureC: 19.4,
      relativeHumidityPct: 44.2,
      vibrationG: 0.08,
      gpsLocation: '48.8566° N, 2.3522° E (Lyon Lab Facility)'
    }
  },
  {
    orderNumber: 'TX-512-19B',
    clientName: 'Marcus Lindqvist',
    company: 'Nordic Architectural Studio',
    email: 'm.lindqvist@nordicarch.se',
    destination: 'Sveavägen 44, Stockholm, Sweden',
    origin: 'Texora High-Precision Loom Mill 2, Stuttgart, Germany',
    orderDate: new Date('2024-10-15T11:00:00Z'),
    estimatedDelivery: new Date('2024-11-04T15:30:00Z'),
    status: 'In Transit',
    currentStageIndex: 4,
    totalVolumeMeters: 280,
    totalAmountUsd: 25060.00,
    carrier: 'DB Schenker High-Value Logistics',
    trackingCode: 'DBS-4491-0982',
    billOfLading: 'BL-TEX-88410',
    items: [
      {
        sku: 'TX-740-ACO',
        name: 'AcoustiWeave Wool Felt Architectural Partition (Limestone)',
        meters: 280,
        unitPrice: 89.50
      }
    ],
    timeline: [
      {
        stage: 'Confirmed',
        date: 'Oct 15, 2024',
        time: '11:00 AM',
        location: 'Texora Central Exchange',
        description: 'Order confirmed and wool carding batch reserved.',
        completed: true,
        active: false
      },
      {
        stage: 'Production',
        date: 'Oct 18, 2024',
        time: '08:00 AM',
        location: 'Stuttgart Loom Mill 2',
        description: 'Weaving and acoustic felt compression completed.',
        completed: true,
        active: false
      },
      {
        stage: 'Quality Check',
        date: 'Oct 23, 2024',
        time: '16:00 PM',
        location: 'Acoustic Chamber Test Rig',
        description: 'Acoustic absorption NRC tested at 0.86 (Passed Class A).',
        completed: true,
        active: false
      },
      {
        stage: 'Packed',
        date: 'Oct 26, 2024',
        time: '10:30 AM',
        location: 'Stuttgart Logistics Bay',
        description: 'Sealed rolls wrapped in heavy-duty weatherproof tarpaulin.',
        completed: true,
        active: false
      },
      {
        stage: 'In Transit',
        date: 'Oct 29, 2024',
        time: '06:00 AM',
        location: 'En route via Malmö Öresund Bridge',
        description: 'Freight currently moving northward on E4 highway.',
        completed: false,
        active: true
      },
      {
        stage: 'Customs Cleared',
        date: 'Est. Nov 02, 2024',
        time: '--:--',
        location: 'Stockholm Freight Terminal',
        description: 'Intra-EU freight clearance inspection.',
        completed: false,
        active: false
      },
      {
        stage: 'Delivered',
        date: 'Est. Nov 04, 2024',
        time: '--:--',
        location: 'Sveavägen 44, Stockholm',
        description: 'Final drop-off and signed receipt.',
        completed: false,
        active: false
      }
    ],
    telemetry: {
      currentTemperatureC: 12.1,
      relativeHumidityPct: 52.0,
      vibrationG: 0.12,
      gpsLocation: '55.6050° N, 13.0038° E (Near Malmö Transit Hub)'
    }
  }
];

const initialMeetings = [
  {
    meetingType: 'fabric',
    durationMinutes: 30,
    date: '2024-11-12',
    timeSlot: '10:00 AM',
    fullName: 'Charlotte Dubois',
    email: 'c.dubois@hermes-contract.fr',
    company: 'Hermès Contract Division',
    phone: '+33 1 40 17 47 00',
    additionalRequirements: 'Technical review of Bio-synthetic silk TX-330-BIO for 2025 hospitality rollout in Tokyo.',
    skuReferences: ['TX-330-BIO'],
    status: 'Confirmed'
  },
  {
    meetingType: 'custom',
    durationMinutes: 60,
    date: '2024-11-14',
    timeSlot: '02:00 PM',
    fullName: 'Kenji Takahashi',
    email: 'k.takahashi@kawasaki-heavy.jp',
    company: 'Kawasaki Heavy Industries',
    phone: '+81 3 3435 2111',
    additionalRequirements: 'High-tensile carbon interlock composite specifications for high-speed rail nose cone.',
    skuReferences: ['TX-902-AER'],
    status: 'Confirmed'
  }
];

const initialSampleRequests = [
  {
    companyName: 'Zaha Hadid Architects',
    contactPerson: 'Sebastian Richter',
    email: 's.richter@zha-design.com',
    phone: '+44 20 7253 5147',
    industrySector: 'Architecture & Interior',
    shippingAddress: {
      street: '10 Bowling Green Lane',
      city: 'London',
      state: 'Greater London',
      postalCode: 'EC1R 0BQ',
      country: 'United Kingdom'
    },
    sampleItems: [
      {
        sku: 'TX-740-ACO',
        name: 'AcoustiWeave Wool Felt Architectural Partition',
        color: 'Limestone Chalk',
        sampleType: 'A4 Binder Swatch + Sound Absorption Lab Cert'
      },
      {
        sku: 'TX-330-BIO',
        name: 'SilkBio-Synthetics High-Luster Contract Satin',
        color: 'Earthy Olive',
        sampleType: 'A4 Binder Swatch'
      }
    ],
    projectEstimatedMeters: 1400,
    notes: 'Required for client mock-up presentation next week in Milan.',
    status: 'Shipped'
  }
];

module.exports = {
  initialProducts,
  initialOrders,
  initialMeetings,
  initialSampleRequests
};
