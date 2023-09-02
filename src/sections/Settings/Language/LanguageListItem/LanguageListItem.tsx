import React from "react";
import { Checkbox } from "../../../../components/inputs/Checkbox/Checkbox";
import { cn, commonCss } from "../../../../utils/styles";
import { Languages, LanguagesData } from "../../../../utils/i18n/constants";
import css from "./LanguageListItem.module.scss";

type LanguageListItemProps = {
  locale: Languages;
  selected: boolean;
  onSelect: (locale: string) => void;
};

export const LanguageListItem = React.memo<LanguageListItemProps>((props) => {
  const handleOnChange = () => props.onSelect(props.locale);

  const languageData = LanguagesData[props.locale];

  return (
    <label className={cn(commonCss.interactive, css.item)}>
      <Checkbox
        inputProps={{
          id: `language_${props.locale}`,
          type: "radio",
          checked: props.selected,
          onChange: handleOnChange,
        }}
      />

      {languageData.name}
    </label>
  );
});
LanguageListItem.displayName = "LanguageListItem";
