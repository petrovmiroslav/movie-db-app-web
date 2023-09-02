import React from "react";
import { cn, commonCss } from "../../utils/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icons } from "../Icons/Icons";
import { useTranslation } from "next-i18next";
import css from "./PageTabBar.module.scss";

const tabDataList = [
  {
    title: "main",
    icon: Icons.MainFilled,
    path: "/",
  },
  {
    title: "search",
    icon: Icons.Search,
    path: "/search",
  },
  {
    title: "favorites",
    icon: Icons.FavoritesFilled,
    path: "/favorites",
  },
  {
    title: "settings",
    icon: Icons.Settings,
    path: "/settings",
  },
] as const;

export const PageTabBar = React.memo(() => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const renderTabBarItem = (tabData: typeof tabDataList[number]) => {
    const title = t(`tabs.${tabData.title}` as const);
    const isSelected = router.pathname === tabData.path;
    const Icon = tabData.icon;

    return (
      <li key={title} className={css.itemContainer}>
        <Link
          className={cn(
            commonCss.interactive,
            css.item,
            isSelected && css.item_selected
          )}
          href={tabData.path}
        >
          <Icon className={css.icon} />
          {title}
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
