import React from "react";
import { cn, commonCss } from "../../utils/styles";
import css from "./PageTabBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icons } from "../Icons/Icons";

const tabDataList = [
  {
    title: "Main",
    icon: Icons.MainFilled,
    path: "/",
  },
  {
    title: "Search",
    icon: Icons.Search,
    path: "/search",
  },
  {
    title: "Favorites",
    icon: Icons.FavoritesFilled,
    path: "/favorites",
  },
];

export const PageTabBar = React.memo(() => {
  const router = useRouter();

  const renderTabBarItem = (tabData: typeof tabDataList[number]) => {
    const isSelected = router.pathname === tabData.path;
    const Icon = tabData.icon;

    return (
      <li key={tabData.title} className={css.itemContainer}>
        <Link
          className={cn(
            commonCss.interactive,
            css.item,
            isSelected && css.item_selected
          )}
          href={tabData.path}
        >
          <Icon className={css.icon} />
          {tabData.title}
        </Link>
      </li>
    );
  };

  return (
    <nav className={cn(commonCss.contentContainer, css.pageTabBar)}>
      <ul className={css.list}>{tabDataList.map(renderTabBarItem)}</ul>
    </nav>
  );
});

PageTabBar.displayName = "PageTabBar";
