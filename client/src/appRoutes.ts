const appRoutes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  movie: (id: string) => `/movie/${id}`,
  profile: {
    index: "/profile",
    watchLater: "/profile/watch-later",
    liked: "/profile/liked",
  },
  premium: "/profile/premium",
  admin: {
    movies: "/admin/movies",
    users: "/admin/users",
    admin: "/admin/"
  },
};

export default appRoutes;
