(function initTheme() {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const themeSetting = getCookie("NEXT_THEME_SETTING") || "system";

  document.documentElement.classList.remove(...["light", "dark"]);

  switch (themeSetting) {
    case "system": {
      document.documentElement.classList.add(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );

      return;
    }
    default: {
      document.documentElement.classList.add(themeSetting);
      return;
    }
  }
})();
