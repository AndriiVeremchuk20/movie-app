import axios from "axios";

const IP_API_URL = "https://ipapi.co/json/";

const getUserIP = async () => {
  return await axios
    .get<{ ip: string }>(IP_API_URL)
    .then((res) => res.data.ip)
    .catch(() => null);
};

export default getUserIP;
