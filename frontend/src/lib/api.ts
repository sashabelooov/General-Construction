import axios from "axios";

// In production (Docker), Nginx proxies /api/v1 to Django, so we use relative URL.
// In local dev, VITE_API_BASE_URL can be set to "http://127.0.0.1:8000/api/v1".
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-GC-Client": "web",
    },
});

export interface MultiLangField {
    uz: string;
    ru: string;
    en: string;
}

export interface Amenity {
    id: number;
    name: MultiLangField;
    image_url: string | null;
}

export interface InteriorSection {
    id: number;
    name: MultiLangField;
    description: MultiLangField;
    image_url: string | null;
    order: number;
}

export interface ArchitectureSection {
    id: number;
    title: MultiLangField;
    description: MultiLangField;
    image_url: string | null;
    order: number;
}

export interface Apartment {
    id: number;
    delivery_year: number;
    area: number;
    rooms: number;
    floor: number;
    number: string;
    image_url: string | null;
    project_id: number;
    project_title: string;
}

export interface LeadCreate {
    type: "consultation" | "contact";
    name: string;
    phone: string;
    source_page?: string;
}

export interface LeadResponse {
    id: number;
    conversation_id: number;
}

export interface ProjectDetail {
    image1_url: string | null;
    image2_url: string | null;
    image3_url: string | null;
    image4_url: string | null;
    image5_url: string | null;
    about_description: MultiLangField;
    about_image_url: string | null;
    video_url: string;
    latitude: number;
    longitude: number;
    architecture_description: MultiLangField;
    architecture_image1_url: string | null;
    architecture_image2_url: string | null;
    architecture_image3_url: string | null;
    interior_description: MultiLangField;
    interior_image_url: string | null;
    amenities: Amenity[];
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    status: string;
    image_url: string | null;
    completion_date: string | null;
    location_name: MultiLangField;
    number_of_houses: number;
    segment: "comfort" | "business" | "premium";
    created_at: string;
    detail: ProjectDetail | null;
    apartments: Apartment[];
    interior_sections: InteriorSection[];
    architecture_sections: ArchitectureSection[];
}

export interface NewsPost {
    id: number;
    slug: string;
    image_url: string | null;
    date_of_creation: string;
    author_name: string;
    title: MultiLangField;
    description: MultiLangField;
    additional_information: MultiLangField;
    link: string;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

const extractData = <T>(res: any): T[] => {
    if (Array.isArray(res.data)) return res.data;
    if (res.data && Array.isArray(res.data.results)) return res.data.results;
    return [];
};

export const api = {
    projects: {
        list: () => apiClient.get<PaginatedResponse<Project> | Project[]>("/projects/").then(res => extractData<Project>(res)),
        get: (id: number | string) => apiClient.get<Project>(`/projects/${id}/`).then(res => res.data),
    },
    apartments: {
        list: (params?: any) => apiClient.get<PaginatedResponse<Apartment> | Apartment[]>("/apartments/", { params }).then(res => extractData<Apartment>(res)),
    },
    news: {
        list: () => apiClient.get<PaginatedResponse<NewsPost> | NewsPost[]>("/news/").then(res => extractData<NewsPost>(res)),
        get: (slug: string) => apiClient.get<NewsPost>(`/news/${slug}/`).then(res => res.data),
    },
    leads: {
        create: (data: LeadCreate) => apiClient.post<LeadResponse>("/leads/", data).then(res => res.data),
    },
};

export default apiClient;
