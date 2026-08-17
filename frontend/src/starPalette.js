// 對應 frontend/doc/macaron-palette.md，兩邊改動時要一起同步
export const STAR_COLORS = [
  "#fac2dc", // 粉膚
  "#fbc2c1", // 珊瑚粉
  "#fbc6ae", // 蜜杏
  "#f1df89", // 奶油黃
  "#e2dd8d", // 檸檬黃
  "#ebd07b", // 玉米黃
  "#ecd09e", // 蜂蜜黃
  "#e7dcbd", // 香草黃
  "#dcd4bb", // 米杏
  "#bce1b3", // 嫩芽綠
  "#a5e4cd", // 薄荷綠
  "#aedfe1", // 水藍
  "#b3dbef", // 天空藍
  "#b9d6fc", // 嬰兒藍
  "#dccafb", // 薰衣草紫
  "#e8c9e4", // 藕荷粉
];

export function randomStarColor() {
  return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
}
