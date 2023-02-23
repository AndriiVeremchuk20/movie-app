// date formal 2023-02-14 22:45:31.064

const isNewMovie = (date: string) => {
  try {
    const today = new Date();
    const moviePostedDate = new Date(date);

    return (
      today.getFullYear() === moviePostedDate.getFullYear() &&
      today.getMonth() === moviePostedDate.getMonth() &&
      today.getDay() - moviePostedDate.getDay() >= 3
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default isNewMovie;
