export default {
  search: {
    placeholder: "Search",
  },
  login: {
    title: "Login",
    email: "Email",
    password: "Password",
    register: "Registration",
  },
  registration: {
    f_name: "First name",
    l_name: "Last name",
    age: "age",
    email: "Email",
    password: "Password",
    rep_password: "Repeat password",
    title: "Register",
    login: "Login",
  },
  userIcon: {
    login: "Login",
    reg: "Registration",
    profile: "Profile",
    watchLater: "Watch Later",
    likedMovies: "Liked Movies",
    logout: "Logout",
    premium: "Premium",
  },
  profile: {
    age: "Age",
    email: "Email",
    likedMovies: "Liked movies",
    addedwl: "Added to watch later",
    watched: "Watched",
    deleteAccount: "Delete accoutn",
  },
  filterPanel: {
    sort: "Sort",
    dt_up: "Date up",
    dt_dw: "Date down",
    n_up: "Name up z-a",
    n_dw: "Name down a-z",
    likes: "Likes",
    watched: "Watched",
    submit: "Sumit",
    reset: "Reset",
    genre: "Genre",
  },
  genres: {
    ALL: "All",
    ACTION: "Action",
    ADVENTURE: "Adventure",
    ANIMATION: "Animation",
    COMEDY: "Comedy",
    CRIME: "Crime",
    DRAMA: "Drama",
    FANTASY: "Fantasy",
    HORROR: "Horror",
    MYSTERY: "Mystery",
    ROMANCE: "Romance",
    SCIENCE_FICTION: "Science Fiction",
    THRILLER: "Thriller",
    WESTERN: "Western",
  },
  premiumPage: {
    title: "Premium",
    onlyFor: "Only For",
    msgForPremium: "You're alredy premium",
    textForPremium: (name: string) => `Dear ${name}.
    We would like to take this opportunity to express our sincere gratitude for choosing Get Movie as your preferred streaming service.
    We appreciate your decision to upgrade to our premium subscription and trust that you will enjoy the enhanced benefits that come with it. At Get Movie, we are committed to providing our customers with the best possible streaming experience.
    We take pride in our extensive collection of movies and TV shows, which is constantly updated to ensure that you have access to the latest and greatest content. Your decision to upgrade to our premium subscription not only helps us to continue providing you with high-quality content but also supports our ongoing efforts to improve our services. Once again, thank you for choosing Get Movie, and we hope that you will enjoy your premium subscription to the fullest.
    Sincerely, GetMovie`,
    msgForNotPremium:
      "Buy premium you get access to movies that are only available for premium user.",
    card: {
      cardNumber: "Card Number",
      expireDate: "Expire Date",
      error: "Opps.. error, please try later.",
      success: "Successful success.",
    },
  },
};
