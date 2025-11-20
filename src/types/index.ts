// User types
export interface User {
    username: string;
    role: 'manager' | 'user';
    createdAt?: Date;
    lastLogin?: Date;
    inResidence?: boolean;
    lastChanged?: Date | { seconds: number; nanoseconds: number } | string;
}

// File types
export interface FileItem {
    id: string;
    name: string;
    url: string;
    category: 'notices' | 'rules' | 'documents' | 'minutes' | 'board';
}

// API Response types
export interface LoginResponse {
    message: string;
    token: string;
    role: string;
}

export interface ApiError {
    message: string;
    error?: string;
}

// Component Props types
export interface LoginProps {
    onLogin: (token: string) => void;
}

export interface AddUserProps {
    token: string;
    role: string;
    onAdd?: () => void;
    onLogout: () => void;
}

export interface UserListProps {
    token: string;
    role: string;
}

export interface UploadFileProps {
    token: string;
    role: string;
    onFileUpload?: () => void;
}

export interface FileListProps {
    userRole: string;
}

export interface NavbarProps {
    userRole: string;
    username?: string;
    onSignOut: () => void;
    onNavigate: (page: string) => void;
    currentPage: string;
}

// JWT Token types
export interface DecodedToken {
    username: string;
    role: string;
    iat: number;
    exp: number;
}