export type orderBy = Array<orderField>;

type orderField =
  | { postedAt: "asc" | "desc" }
  | { likes: { _count: "desc" } }
  | { watched: { _count: "desc" } }
  | { name: "asc" | "desc" };
