import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from '../interfaces/google-user.interface';

/**
 * Estrategia de autenticación de Google OAuth 2.0
 * Se ejecuta automáticamente cuando el usuario inicia sesión con Google
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
            scope: ['email', 'profile'],
        });
    }

    /**
     * Método ejecutado cuando Google devuelve los datos del usuario
     * @param accessToken - Token de acceso de Google
     * @param refreshToken - Token de refresco de Google
     * @param profile - Perfil del usuario desde Google
     * @param done - Callback para pasar el usuario procesado
     */
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ): Promise<void> {
        try {
            const { id, name, emails, photos } = profile;

            // Validar que existan los datos mínimos requeridos
            if (!emails || emails.length === 0) {
                return done(new Error('No se pudo obtener el email del usuario'), undefined);
            }

            const googleUser: GoogleUser = {
                googleId: id,
                email: emails[0].value,
                firstName: name?.givenName || '',
                lastName: name?.familyName || '',
                picture: photos && photos.length > 0 ? photos[0].value : '',
                accessToken,
            };

            done(null, googleUser);
        } catch (error) {
            done(error, undefined);
        }
    }
}