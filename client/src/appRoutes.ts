const appRoutes = {
  home: "/",
  login: "/login",
  registration: "/registration",
  movie: (id: string) => `/movie/${id}`,
  profile: "/profile",
  watchLater: "/watch-later",
  premium: "/profile/premium",
  admin: {
    movies: "/admin/movies",
    users: "/admin/users",
  },
};

export default appRoutes;
