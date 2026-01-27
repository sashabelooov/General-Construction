// Project data with detailed information for project detail pages
import projectImage1 from "@/assets/project-1.jpg";
import projectImage2 from "@/assets/project-2.jpg";
import projectImage3 from "@/assets/project-3.jpg";
import heroBuilding1 from "@/assets/hero-building-1.jpg";
import heroBuilding2 from "@/assets/hero-building-2.jpg";
import heroBuilding3 from "@/assets/hero-building-3.jpg";
import floorPlan1 from "@/assets/floor-plan-1.jpg";
import floorPlan2 from "@/assets/floor-plan-2.jpg";
import floorPlan3 from "@/assets/floor-plan-3.jpg";

export interface Apartment {
    id: number;
    number: string;
    area: number;
    rooms: number;
    floor: number;
    deliveryYear: string;
    project: string;
    image: string;
    isFavorite: boolean;
}

export interface Amenity {
    id: number;
    name: string;
    image: string;
}

export interface ProjectDetail {
    id: number;
    name: string;
    slug: string;
    location: string;
    deliveryDate: string | null;
    class: "Comfort" | "Business" | "Premium";
    status: "Under Construction" | "For Sale" | "Completed";

    // Images
    thumbnailImage: string;
    heroImage: string;
    aboutImage: string;
    architectureImages: string[];

    // Statistics
    blocks: number;
    apartments: number;
    totalArea: number;
    floors: number;

    // Descriptions
    shortDescription: string;
    fullDescription: string;
    architectureDescription: string;
    interiorDescription: string;

    // Map
    mapCoordinates: {
        lat: number;
        lng: number;
    };
    mapEmbedUrl: string;

    // Amenities
    amenities: Amenity[];

    // Available apartments
    availableApartments: Apartment[];
}

export const projectsData: ProjectDetail[] = [
    {
        id: 1,
        name: "Sunset Villas",
        slug: "sunset-villas",
        location: "Los Angeles, Hollywood",
        deliveryDate: "2027-06-01",
        class: "Comfort",
        status: "Under Construction",
        thumbnailImage: projectImage1,
        heroImage: heroBuilding1,
        aboutImage: projectImage1,
        architectureImages: [heroBuilding1, projectImage2, projectImage3],
        blocks: 3,
        apartments: 240,
        totalArea: 18500,
        floors: 16,
        shortDescription: "Premium residential complex with modern amenities and stunning views",
        fullDescription: "Sunset Villas is a premium residential complex located in the heart of Hollywood, Los Angeles. The project features three modern blocks with a total of 240 luxury apartments. Each building is designed with contemporary architecture and equipped with state-of-the-art facilities. Residents will enjoy panoramic views of the city and mountains, along with exclusive access to premium amenities including a rooftop infinity pool, fully-equipped fitness center, and 24/7 security.",
        architectureDescription: "The architectural design of Sunset Villas combines modern aesthetics with functional living spaces. The facade features floor-to-ceiling windows and premium materials including natural stone and high-quality glass. The building's design maximizes natural light and ventilation while maintaining energy efficiency through advanced insulation and smart building technologies.",
        interiorDescription: "Each apartment in Sunset Villas is designed with meticulous attention to detail, featuring open-plan layouts, high ceilings, and premium finishes. The interiors blend contemporary design with comfort, creating elegant living spaces perfect for modern lifestyles.",
        mapCoordinates: {
            lat: 34.0928,
            lng: -118.3287
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.4!2d-118.3287!3d34.0928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzM0LjIiTiAxMTjCsDE5JzQzLjMiVw!5e0!3m2!1sen!2sus!4v1234567890",
        amenities: [
            { id: 1, name: "Swimming Pool", image: projectImage1 },
            { id: 2, name: "Fitness Center", image: projectImage2 },
            { id: 3, name: "24/7 Security", image: projectImage3 },
            { id: 4, name: "Video Monitoring", image: heroBuilding1 },
            { id: 5, name: "Parking", image: heroBuilding2 },
            { id: 6, name: "Children's Playground", image: heroBuilding3 },
        ],
        availableApartments: [
            { id: 1, number: "1A", area: 75, rooms: 2, floor: 5, deliveryYear: "2027", project: "Sunset Villas", image: floorPlan1, isFavorite: false },
            { id: 2, number: "37", area: 95, rooms: 3, floor: 8, deliveryYear: "2027", project: "Sunset Villas", image: floorPlan2, isFavorite: false },
            { id: 3, number: "42", area: 120, rooms: 4, floor: 12, deliveryYear: "2027", project: "Sunset Villas", image: floorPlan3, isFavorite: false },
            { id: 4, number: "16", area: 70, rooms: 2, floor: 3, deliveryYear: "2027", project: "Sunset Villas", image: floorPlan1, isFavorite: false },
            { id: 5, number: "88", area: 100, rooms: 3, floor: 10, deliveryYear: "2027", project: "Sunset Villas", image: floorPlan2, isFavorite: false },
        ]
    },
    {
        id: 2,
        name: "Downtown Towers",
        slug: "downtown-towers",
        location: "New York, Manhattan",
        deliveryDate: null,
        class: "Business",
        status: "Completed",
        thumbnailImage: projectImage2,
        heroImage: heroBuilding2,
        aboutImage: projectImage2,
        architectureImages: [heroBuilding2, projectImage1, projectImage3],
        blocks: 2,
        apartments: 320,
        totalArea: 25600,
        floors: 24,
        shortDescription: "Luxury high-rise in the heart of Manhattan with premium business-class apartments",
        fullDescription: "Downtown Towers represents the pinnacle of urban living in Manhattan. This completed project features two elegant towers with a total of 320 business-class apartments. Located in the heart of the financial district, residents enjoy unparalleled access to NYC's best dining, shopping, and entertainment options. The building features premium amenities and services designed for the modern professional.",
        architectureDescription: "Downtown Towers showcases award-winning architecture with its sleek glass facade and modern design. The towers feature sustainable construction practices and cutting-edge building systems that ensure comfort and efficiency for all residents.",
        interiorDescription: "The apartments feature sophisticated interior design with premium materials, smart home technology, and panoramic city views. Each unit is designed to provide a luxurious living experience with spacious layouts and high-end finishes.",
        mapCoordinates: {
            lat: 40.7589,
            lng: -73.9851
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9851!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3M8KwNTknMDYuNCJX!5e0!3m2!1sen!2sus!4v1234567890",
        amenities: [
            { id: 1, name: "Rooftop Lounge", image: projectImage2 },
            { id: 2, name: "Gym & Spa", image: projectImage1 },
            { id: 3, name: "Concierge Service", image: projectImage3 },
            { id: 4, name: "Business Center", image: heroBuilding2 },
            { id: 5, name: "Underground Parking", image: heroBuilding1 },
        ],
        availableApartments: [
            { id: 1, number: "195", area: 85, rooms: 2, floor: 10, deliveryYear: "2024", project: "Downtown Towers", image: floorPlan2, isFavorite: false },
            { id: 2, number: "201", area: 110, rooms: 3, floor: 15, deliveryYear: "2024", project: "Downtown Towers", image: floorPlan1, isFavorite: false },
            { id: 3, number: "312", area: 145, rooms: 4, floor: 20, deliveryYear: "2024", project: "Downtown Towers", image: floorPlan3, isFavorite: false },
        ]
    },
    {
        id: 3,
        name: "Riverside Apartments",
        slug: "riverside-apartments",
        location: "Chicago, Downtown",
        deliveryDate: "2026-06-15",
        class: "Premium",
        status: "For Sale",
        thumbnailImage: projectImage3,
        heroImage: heroBuilding3,
        aboutImage: projectImage3,
        architectureImages: [heroBuilding3, projectImage1, projectImage2],
        blocks: 1,
        apartments: 180,
        totalArea: 16200,
        floors: 12,
        shortDescription: "Exclusive riverside living with premium amenities and breathtaking water views",
        fullDescription: "Riverside Apartments offers exclusive premium living along Chicago's beautiful waterfront. This prestigious project features a single elegant tower with 180 luxury apartments, each designed to maximize the stunning river and skyline views. The development includes world-class amenities and services, creating an unparalleled living experience for discerning residents.",
        architectureDescription: "The architectural design of Riverside Apartments is a masterpiece of modern engineering and aesthetic excellence. The curved glass facade reflects the flowing river, while the building's structure incorporates advanced seismic and weather protection technologies.",
        interiorDescription: "Premium interiors feature Italian marble, custom cabinetry, and designer fixtures throughout. Floor-to-ceiling windows in every apartment create bright, airy spaces with unobstructed views of the Chicago River and skyline.",
        mapCoordinates: {
            lat: 41.8781,
            lng: -87.6298
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.3!2d-87.6298!3d41.8781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUyJzQxLjIiTiA4N8KwMzcnNDcuMyJX!5e0!3m2!1sen!2sus!4v1234567890",
        amenities: [
            { id: 1, name: "Infinity Pool", image: projectImage3 },
            { id: 2, name: "Private Gym", image: projectImage1 },
            { id: 3, name: "Wine Cellar", image: projectImage2 },
            { id: 4, name: "Yoga Studio", image: heroBuilding3 },
            { id: 5, name: "Valet Parking", image: heroBuilding1 },
            { id: 6, name: "River Terrace", image: heroBuilding2 },
        ],
        availableApartments: [
            { id: 1, number: "401", area: 130, rooms: 3, floor: 8, deliveryYear: "2026", project: "Riverside Apartments", image: floorPlan3, isFavorite: false },
            { id: 2, number: "502", area: 160, rooms: 4, floor: 10, deliveryYear: "2026", project: "Riverside Apartments", image: floorPlan1, isFavorite: false },
            { id: 3, number: "601", area: 200, rooms: 5, floor: 12, deliveryYear: "2026", project: "Riverside Apartments", image: floorPlan2, isFavorite: false },
            { id: 4, number: "305", area: 125, rooms: 3, floor: 6, deliveryYear: "2026", project: "Riverside Apartments", image: floorPlan3, isFavorite: false },
        ]
    },
];

// Helper function to get project by ID
export const getProjectById = (id: number): ProjectDetail | undefined => {
    return projectsData.find(project => project.id === id);
};

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
    return projectsData.find(project => project.slug === slug);
};
