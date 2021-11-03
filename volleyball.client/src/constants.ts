export const routers = {
    games: "/games",
    game: "/games/:id",
    home: '/',
    player: '/profile/:id',
    profile: '/me',
    clubs: '/clubs',
    hall: '/halls/:id',
    newHall: '/newHall',
    notFound: '/notFound'
}
export const localStorageKeys = {
    language: "language",
    token: "token",
    playerId:"id"
}

export const ServerCalls = false;

export const languages = ['en', 'ru', 'md'];
