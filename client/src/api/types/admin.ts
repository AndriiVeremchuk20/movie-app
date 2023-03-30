export type responseStatsData = {
  registrations: Array<[string, number]>;
  watched: Array<[string, number]>;
  mostActiveUsers: Array<{
    Watched: number;
    firstName: number;
    lastName: number;
    likes: number;
    watchLater: number;
    comments: number;
  }>;
};
