import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import path from 'node:path';
import fs from 'node:fs';

const GOOGLE_CLIENT_ID = () => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        const data = fs.readFileSync(path.join(__dirname, './.env'));
        console.log(data);
        
        throw new Error('No GOOGLE_CLIENT_ID environment variable');
    }
    return process.env.GOOGLE_CLIENT_ID!
};
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID(),
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback' // TODO: host (servers IP)
}, async (accessToken, refreshToken, profile, done) => {
    if (!profile.emails || profile.emails.length === 0) {
        return done(new Error('No email found in profile'), undefined);
    }

    const email = profile.emails[0].value;
    const userRepository = new UserRepository();
    let user = await userRepository.findByEmail(email);

    if (!user) {
        user = new User();
        user.email = email;
        user.username = profile.displayName;
        user.isEmailConfirmed = true;
        user.generateToken();
        await userRepository.saveUser(user);
    }
    done(null, user);
}));

// Сохранение идентификатора пользователя в сессии
passport.serializeUser((user, done) => {
    done(null, (user as User).id);
});

// Восстановление данных пользователя из сессии
passport.deserializeUser(async (id: number, done) => {
    const userRepository = new UserRepository();
    try {
        const user = await userRepository.findById(id); // Извлечение данных пользователя из базы данных
        done(null, user); // Добавление данных пользователя в req.user
    } catch (error) {
        done(error, null); // Обработка ошибок
    }
});