import { Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

export const STATES = {
  IDLE: "idle",
  LOADING: "loading",
  LOADING_BACKGROUND: "loading_background",
  SUCCESS: "sucees",
  ERROR: "error"
};

export const SORT = {
  TRENDING: "likesCount",
  NEW: "timestamp",
  SUBMISSIONS: "timestamp",
  HALL_OF_FAME: "likesCount"
};

export const TOOLS = {
  PENCIL: "pencil",
  BUCKET: "bucket",
  ERASER: "eraser"
};

export const TABBAR_HEIGHT = 70;
export const HEADER_HEIGHT = 40;
export const BUTTON_WIDTH = 275;

export const PIXEL_COUNT = 16;

export const EDITOR_BORDER_SIZE = 10;
export const PIXEL_SIZE =
  (Dimensions.get("window").width - EDITOR_BORDER_SIZE * 2) / PIXEL_COUNT;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
