import LocalizedStrings from 'react-localization';
import localStorageService from './localStorageService';
import { localStorageKeys } from '../constants';

const strings = new LocalizedStrings({
    en: {
        Day: "Date",
        StartAt: "Start at",
        EndAt: "End at",
        NoPlayerYet: "No players yet",
        Extra: "Extra",
        Games: "Games",
        Home: "Profile",
        Subscribe: "Ask for Subscription",
        RegisterToGame: "Register to game",
        MyHalls: "My Clubs",
        Taxs: "Tax for this game is:",
        Location: "Location:",
        Administrator: "Administrator:",
        ForQuestion: "For questions call: ",
        AddHall: "Add Club",
        noHalls: "There are no halls that you are administering",
        DayOfWeek: "Day of week",
        daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        GamesAgenda: "Games Agenda",
        Unregister: 'Unregister from game',
        PlayerStatus:['Guest','Member','SpecialGuest','Blocked']
    },
    md: {
        Day: "Data",
        StartAt: "Începe",
        EndAt: "Finisează",
        NoPlayerYet: "Nu sunt jucători înregistrați",
        Extra: "Extra",
        Games: "Jocuri",
        Home: "Profil",
        Subscribe: "Solicită abonament",
        RegisterToGame: "Înregistrează-te la joc",
        MyHalls: "Cluburile mele",
        Taxs: "Taxa pentru joc:",
        Location: "Locația:",
        Administrator: "Administrator:",
        ForQuestion: "Pentru întrebări telefonați: ",
        AddHall: "Adaugă club",
        noHalls: "Nu administrați nici o sală",
        DayOfWeek: "Ziua săptămânii",
        daysOfWeek: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sîmbătă"],
        GamesAgenda: "Agenda jocurilor",
        Unregister: 'Șterge înregistarea',
        PlayerStatus:['Invitat','Membru','Invitat Special','Blocat']
    },
    ru: {
        Day: "Дата",
        StartAt: "Начало",
        EndAt: "Конец",
        NoPlayerYet: "Не кто не записан",
        Extra: "Extra",
        Games: "Игры",
        Home: "Профиль",
        Subscribe: "Попросить подписку",
        RegisterToGame: "Записатся на игру",
        MyHalls: "Мой клубы",
        Taxs: "Цена на игру:",
        Location: "Расположение:",
        Administrator: "Администратор:",
        ForQuestion: "По вопросам звоните: ",
        AddHall: "Добавь клуб",
        noHalls: "Нет залов, которыми вы управляете",
        DayOfWeek: "День недель",
        daysOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        GamesAgenda: "Запись игры",
        Unregister: 'отписатся от игры',
        PlayerStatus:['Гость','Член','Особый гость','Заблокирован']
    }
});
strings.setLanguage(localStorageService.getItem(localStorageKeys.language) ?? 'en');

export function setLanguage(countryCode: string) {
    localStorageService.setItem(localStorageKeys.language, countryCode)
    strings.setLanguage(countryCode);
}

export default strings;