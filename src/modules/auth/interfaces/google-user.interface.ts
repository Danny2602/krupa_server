/**
 * Interfaz para el usuario devuelto por Google OAuth
 */
export interface GoogleUser {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
}
