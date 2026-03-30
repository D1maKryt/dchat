import { Url } from "@/utils";

export const BASE_PATH_NAME = "";
export const API_ORIGIN = new Url("http://localhost:8080");
export const API_URL: Url = API_ORIGIN.overwriteAndCreate({
  pathname: BASE_PATH_NAME,
});
export const WEBSCOKET_URL: Url = API_ORIGIN.overwriteAndCreate({
  pathname: "/",
});
export const API_AUTH_URL: Url = API_ORIGIN.overwriteAndCreate({
  pathname: "/auth/google",
});
