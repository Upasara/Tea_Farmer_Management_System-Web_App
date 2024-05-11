import React from "react";

type MenuData = [boolean | undefined, (menu: boolean | undefined) => void];

export const MenuContext = React.createContext<MenuData>([false, () => ({})]);