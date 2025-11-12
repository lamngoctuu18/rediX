// Station data with coordinates for Google Maps
export interface Station {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  availableBikes: number;
}

export const STATIONS: Station[] = [
  {
    id: 'van-khe',
    name: 'Trạm Văn Khê',
    address: 'Ga Văn Khê, Hà Đông, Hà Nội',
    lat: 20.9738, // Tọa độ ga Văn Khê
    lng: 105.7850,
    availableBikes: 20
  },
  {
    id: 'dai-nam',
    name: 'Trạm Đại học Đại Nam',
    address: 'Đại học Đại Nam, Hà Đông, Hà Nội',
    lat: 20.9625, // Tọa độ Đại học Đại Nam (ước tính)
    lng: 105.7750,
    availableBikes: 15
  }
];

// Route configuration for turn-based rental
export interface TurnRoute {
  id: string;
  label: string;
  from: string; // station id
  to: string; // station id
  distance: string;
  estimatedTime: string;
}

export const TURN_ROUTES: TurnRoute[] = [
  {
    id: 'van-khe-to-dai-nam',
    label: 'Ga Văn Khê → Đại học Đại Nam',
    from: 'van-khe',
    to: 'dai-nam',
    distance: '~2.5 km',
    estimatedTime: '~15 phút'
  },
  {
    id: 'dai-nam-to-van-khe',
    label: 'Đại học Đại Nam → Ga Văn Khê',
    from: 'dai-nam',
    to: 'van-khe',
    distance: '~2.5 km',
    estimatedTime: '~15 phút'
  }
];

export const getStationById = (id: string): Station | undefined => {
  return STATIONS.find(s => s.id === id);
};

export const getRouteById = (id: string): TurnRoute | undefined => {
  return TURN_ROUTES.find(r => r.id === id);
};
