export default {
  /**
   * @see https://vuetifyjs.com/en/customization/breakpoints
   */
  breakpoint: {},
  /**
   * @see https://vuetifyjs.com/en/customization/icons
   */
  icons: {
    iconFont: "mdi",
  },
  /**
   * @see https://vuetifyjs.com/en/customization/internationalization
   */
  lang: {},
  /**
   * @see https://vuetifyjs.com/en/customization/rtl
   */
  rtl: false,
  /**
   * @see https://vuetifyjs.com/en/customization/theme
   */
  theme: {
    disable: false,
    themes: {
      light: {
        primary: "#22b0ff",
        warning: "#ffa822",
        error: "#ff3c34",
      },
      dark: {
        primary: "#22b0ff",
        warning: "#ffa822",
        error: "#ff3c34",
        background: "#1a1a1a",
      },
    },
    dark: true,
    options: {
      customProperties: true,
    },
  },
};
