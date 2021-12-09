import { useHeaderHeight } from "@react-navigation/stack";
import { Dimensions, DeviceInfo, Platform } from "react-native";

export const getOrientation = () => {
  const { width, height } = Dimensions.get("window");
  return width > height ? LANDSCAPE : PORTRAIT;
};
export const STATES = {
  IDLE: "idle",
  LOADING: "loading",
  LOADING_BACKGROUND: "loading_background",
  SUCCESS: "sucees",
  ERROR: "error",
};

export const SORT = {
  TRENDING: "likesCount",
  NEW: "timestamp",
  SUBMISSIONS: "timestamp",
  HALL_OF_FAME: "likesCount",
};

export const TOOLS = {
  PENCIL: "pencil",
  BUCKET: "bucket",
  ERASER: "eraser",
};

export const HEADER_HEIGHT = 80;
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
  "Dec",
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
  "December",
];

export const AvatorPhotos = [
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat1.png?alt=media&token=0a27994e-baf6-4679-bd8e-fe41e0075383",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat2.png?alt=media&token=429a5675-9aaf-486f-a931-618e4ff695b3",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat3.png?alt=media&token=b2db1b61-6ac7-4e67-bd97-d465e7742ceb",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat4.png?alt=media&token=7b2f8ad8-55d4-41a3-92ec-367d91c7b6ed",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat5.png?alt=media&token=cc6e4144-c25c-4d63-a038-601e7cc39ee7",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat6.png?alt=media&token=9640694d-c083-4fd0-9856-98f02ada6353",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat7.png?alt=media&token=e9287e01-fa10-4938-a978-4ea8e2a100d1",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat8.png?alt=media&token=d0155434-aeac-447d-aa40-3707ef0fb011",
  "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/Cat9.png?alt=media&token=990d2d06-55e8-4c6f-9c93-0fb05888ec8f",
];
