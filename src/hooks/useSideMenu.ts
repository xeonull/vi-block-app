const arraySideMenu = [
  { id: "m001", title: "Market", link: "/market", mt_icon: "attach_money" },
  { id: "m002", title: "Blockchain", link: "/block", mt_icon: "activity_zone" },
  { id: "m003", title: "Wallet", link: "/wallet", mt_icon: "wallet" },
];
const arrayBottomSideMenu = [{ id: "s001", title: "Settings", link: "/settings", mt_icon: "settings" }];

export function useSideMenu() {
  return { arraySideMenu, arrayBottomSideMenu };
}
