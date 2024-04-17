export function getAppStyleUpgrades(isLightTheme: boolean) {
  return {
    token: {
      colorPrimary: '#d29ada',
      colorSuccess: '#8ae1c0',
      colorWarning: '#f7c180',
      colorError: '#fa8788',
      borderRadius: 9,
      fontSizeHeading1: 24,
      colorBgBase: isLightTheme ? '#f9f9f9' : '#26272d',
      colorLink: '#d29ada',
      colorLinkHover: '#F593F5',
    },
    components: { Switch: { trackMinWidth: 60 } },
  }
}
