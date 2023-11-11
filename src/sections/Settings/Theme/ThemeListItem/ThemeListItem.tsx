import React from "react";
import { Checkbox } from "../../../../components/inputs/Checkbox/Checkbox";
import { cn, commonCss } from "../../../../utils/styles";
import { ThemesSettings } from "../../../../features/theme/constants";
import css from "./ThemeListItem.module.scss";

type ThemeListItemProps = {
  theme: ThemesSettings;
  selected: boolean;
  onSelect: (theme: ThemesSettings) => void;
};

export const ThemeListItem = React.memo<ThemeListItemProps>((props) => {
  const handleOnChange = () => props.onSelect(props.theme);

  return (
    <label className={cn(commonCss.interactive, css.item)}>
      <Checkbox
        inputProps={{
          id: `theme_${props.theme}`,
          type: "radio",
          checked: props.selected,
          onChange: handleOnChange,
        }}
      />

      {props.theme}
    </label>
  );
});
ThemeListItem.displayName = "ThemeListItem";
