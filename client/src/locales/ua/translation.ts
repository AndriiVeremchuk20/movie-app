export default {
  search: {
    placeholder: "Пошук",
  },
  login: {
    title: "Вхід",
    email: "Почта",
    password: "Пароль",
    register: "Зареєструватися",
  },
  registration: {
    f_name: "Ім'я",
    l_name: "Призвище",
    age: "Вік",
    email: "Пошта",
    password: "Пароль",
    rep_password: "Повторіть пароль",
    title: "Реєстрація",
    login: "Вхід",
  },
  userIcon: {
    login: "Вхід",
    reg: "Реєстрація",
    profile: "Профіль",
    watchLater: "Дивитись пізніше",
    likedMovies: "Лайкнуті фільми",
    logout: "Вихід",
    premium: "Преміум",
  },
  profile: {
    age: "Вік",
    email: "Пошта",
    likedMovies: "Всього лайкнуто фільмів",
    addedwl: "Всього додано в Переглянути пізніше",
    watched: "Переглянуто",
    deleteAccount: "Видалити акаунт",
  },
  filterPanel: {
    sort: "Сортувати",
    dt_up: "Від старих до нових",
    dt_dw: "Від нових до старих",
    n_up: "Назва я-а",
    n_dw: "Назва а-я",
    likes: "За лайками",
    watched: "За переглядами",
    submit: "Примінити",
    reset: "Скинути",
    genre: "Жанри",
  },
  genres: {
    ALL: "Всі",
    ACTION: "Бойовик",
    ADVENTURE: "Пригоди",
    ANIMATION: "Мультфільм",
    COMEDY: "Комедія",
    CRIME: "Кримінальний",
    DRAMA: "Драма",
    FANTASY: "Фантастика",
    HORROR: "Жахи",
    MYSTERY: "Таємниця",
    ROMANCE: "Романтика",
    SCIENCE_FICTION: "Наукова фантастика",
    THRILLER: "Трилер",
    WESTERN: "Вестерн",
  },
  premiumPage: {
    title: "Преміум",
    onlyFor: "Тільки для",
    msgForPremium: "Ви зараз Преміум",
    textForPremium: (name: string) => `Шановний ${name}!
    Ми хотіли б скористатися цією можливістю, щоб висловити нашу щирість
    вдячність за те, що ви вибрали Get Movie як улюблену потокову трансляцію
    обслуговування. Ми цінуємо ваше рішення перейти на нашу
    преміум-підписку та віремо в те, що вам сподобається
    розширені переваги, які з ним пов’язані. Ми в Get Movie
    прагнемо надавати нашим клієнтам найкраще
    потоковий досвід. Ми пишаємося нашим широким асортиментом
    колекція фільмів, яка постійно поповнюється
    щоб забезпечити доступ до найновіших і найкращих
    вміст. Ваше рішення перейти на нашу преміум-підписку
    не тільки допомагає нам продовжувати надавати вам високу якість
    вмісту, а також підтримує наші постійні зусилля щодо вдосконалення наших
    послуги. Ще раз дякуємо вам і нам за вибір Get Movie
    сподіваюся, що вам сподобається преміум-підписка.`,
    msgForNotPremium:
      "Купивши преміум-підписку ви отримуєте достуб до багатьох фільмів які доступні лише для преміум користувачів",
    card: {
      cardNumber: "Номер Карти",
      expireDate: "Термін Карти",
      error: "Упс.. Сталася помилка, спробуйте пізніше.",
      success: "Платіж успішний.",
    },
  },
};
