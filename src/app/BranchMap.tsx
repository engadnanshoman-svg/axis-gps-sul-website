'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* ───── custom marker icons ───── */
const createIcon = (color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  })
}

const icons = {
  main: createIcon('#0ea5a0'),
  north: createIcon('#6366f1'),
  ramallah: createIcon('#f59e0b'),
  hebron: createIcon('#ef4444'),
}

/* ───── branch data ───── */
const branches = [
  {
    id: 'main',
    name: 'الفرع الرئيسي',
    nameEn: 'Tziporit Industrial Zone',
    address: 'المنطقة الصناعية تسيفوريت - شارع הסדנא',
    phone: '04-6419995',
    lat: 32.7579702,
    lng: 35.3189103,
    icon: icons.main,
    color: '#0ea5a0',
  },
  {
    id: 'north',
    name: 'فرع الشمال',
    nameEn: 'Kafr Qasim',
    address: 'كفر قاسم - شارع علي بن أبي طالب 2',
    phone: '0595289999',
    lat: 32.11146,
    lng: 34.96504,
    icon: icons.north,
    color: '#6366f1',
  },
  {
    id: 'ramallah',
    name: 'فرع رام الله',
    nameEn: 'Ramallah',
    address: 'رام الله - شارع الإرسال قرب السفينة',
    phone: '02-2950149',
    lat: 31.8652474,
    lng: 35.2287424,
    icon: icons.ramallah,
    color: '#f59e0b',
  },
  {
    id: 'hebron',
    name: 'فرع الخليل',
    nameEn: 'Hebron',
    address: 'الخليل - برج العز ط5 شارع عين سارة مقابل ستاد الحسين',
    phone: '0594224498',
    lat: 31.537372,
    lng: 35.0987544,
    icon: icons.hebron,
    color: '#ef4444',
  },
]

/* ───── fly-to controller ───── */
function FlyToBranch({ branchId }: { branchId: string | null }) {
  const map = useMap()
  useEffect(() => {
    if (branchId) {
      const b = branches.find(br => br.id === branchId)
      if (b) {
        map.flyTo([b.lat, b.lng], 15, { duration: 1.5 })
      }
    }
  }, [branchId, map])
  return null
}

/* ───── main map component ───── */
export default function BranchMap() {
  const [mounted, setMounted] = useState(false)
  const [activeBranch, setActiveBranch] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] rounded-2xl border border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] flex items-center justify-center">
        <div className="text-[oklch(0.50_0.02_250)] text-sm">جاري تحميل الخريطة...</div>
      </div>
    )
  }

  const handleBranchClick = (id: string) => {
    setSelectedBranch(id === selectedBranch ? null : id)
    setActiveBranch(id === selectedBranch ? null : id)
  }

  return (
    <div className="space-y-4">
      {/* Branch selector cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {branches.map(b => (
          <button
            key={b.id}
            onClick={() => handleBranchClick(b.id)}
            className={`relative p-3 rounded-xl border text-right transition-all duration-300 group ${
              selectedBranch === b.id
                ? 'border-[oklch(0.72_0.14_180)] bg-[oklch(0.72_0.14_180_/_0.12)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.1)]'
                : 'border-[oklch(0.30_0.03_250)] bg-[oklch(0.17_0.02_250)] hover:border-[oklch(0.30_0.05_250)]'
            }`}
          >
            {/* Color dot */}
            <div
              className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            <div className="text-[oklch(0.90_0.005_250)] text-xs sm:text-sm font-semibold mt-1">{b.name}</div>
            <div className="text-[oklch(0.50_0.02_250)] text-[10px] sm:text-xs mt-0.5 leading-tight">{b.address}</div>
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border border-[oklch(0.30_0.03_250)] shadow-xl">
        <MapContainer
          center={[32.15, 35.15]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: '420px', width: '100%' }}
          className="leaflet-dark"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToBranch branchId={activeBranch} />
          {branches.map(b => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={b.icon}>
              <Popup>
                <div className="text-right font-sans" dir="rtl" style={{ minWidth: '180px' }}>
                  <div className="font-bold text-sm mb-1" style={{ color: b.color }}>{b.name}</div>
                  <div className="text-xs text-gray-600 mb-1">{b.address}</div>
                  <div className="text-xs text-gray-500" dir="ltr">{b.phone}</div>
                  <a
                    href={`https://www.google.com/maps?q=${b.lat},${b.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-blue-600 hover:underline"
                  >
                    فتح في خرائط جوجل ↗
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Overlay gradient on edges */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[oklch(0.55_0.02_250)] text-xs">
        {branches.map(b => (
          <button
            key={b.id}
            onClick={() => handleBranchClick(b.id)}
            className="flex items-center gap-1.5 hover:text-[oklch(0.80_0.005_250)] transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: b.color }} />
            {b.name}
          </button>
        ))}
      </div>
    </div>
  )
}
