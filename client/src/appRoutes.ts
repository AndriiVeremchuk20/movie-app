const appRoutes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  movie: {
    movie: (id: string) => `/movie/${id}`,
    movieNotFound: "/movie/404",
  },
  profile: {
    index: "/profile",
    watchLater: "/profile/watch-later",
    liked: "/profile/liked",
  },
  premium: "/profile/premium",
  admin: {
    movies: "/admin/movies",
    users: "/admin/users",
    admin: "/admin/",
  },
};

export default appRoutes;
