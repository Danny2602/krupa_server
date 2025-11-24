/**
 * Interfaz para el usuario devuelto por Google OAuth
 */
export interface GoogleUser {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    avatar?: string; // Optional: alternative name for picture
    accessToken: string;
}
