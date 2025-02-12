import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Spin from './Spin';

interface Project {
    projectName: string;
    location: string;
    image: string;
    price: string;
    builderName: string;
    coordinates: {
        latitude: number | null;
        longitude: number | null;
    };
}

// 📍 Auto-fit map based on project locations
const FitBounds = ({ projects }: { projects: Project[] }) => {
    const map = useMap();
    const bounds: LatLngBoundsExpression = projects
        .filter(proj => proj.coordinates.latitude && proj.coordinates.longitude)
        .map(proj => [proj.coordinates.latitude!, proj.coordinates.longitude!] as [number, number]);

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for better spacing
    }

    return null;
};

export default function MapComponent({ projects, load = false }: { projects: Project[], load?: boolean }) {
    const indiaCenter: LatLngExpression = [20.5937, 78.9629];

    const createCustomIcon = (imageUrl: string) => {
        return L.divIcon({
            html: `<div style="
                width: 50px; 
                height: 50px; 
                background-image: url('${imageUrl}');
                background-size: cover; 
                background-position: center; 
                border-radius: 6px; 
                border: 1px solid #dbdbdb;
            "></div>`,
            className: '' 
        });
    };

    return (
        !load ? (
            <MapContainer
                center={indiaCenter}
                zoom={5}
                style={{ height: '500px', borderRadius: '12px', marginTop: '1rem', outline: 'none' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                
                {/* Auto-fit based on project locations */}
                <FitBounds projects={projects} />

                {projects.map((proj, idx) =>
                    proj.coordinates.latitude && proj.coordinates.longitude ? (
                        <Marker
                            key={idx}
                            position={[proj.coordinates.latitude, proj.coordinates.longitude]}
                            icon={createCustomIcon(proj.image)}
                        >
                            <Popup>
                                <strong>{proj.projectName}</strong><br />
                                {proj.price} <br />
                                {proj.builderName}
                            </Popup>
                        </Marker>
                    ) : null
                )}
            </MapContainer>
        ) : (
            <div className='flex justify-center items-center h-[400px] w-auto rounded-[12px] mt-[1rem]'>
                <Spin />
            </div>
        )
    );
}
