export function getAppStyleUpgrades(isLightTheme: boolean) {
  return {
    token: {
      colorPrimary: '#d29ada',
      colorSuccess: '#8ae1c0',
      colorWarning: '#f7c180',
      colorError: '#fa8788',
      borderRadius: 9,
      colorBgBase: isLightTheme ? '#f9f9f9' : '#26272d',
      colorLink: '#d29ada',
      colorLinkHover: '#F593F5',
      colorTextSecondary: isLightTheme
        ? 'rgba(0, 0, 0, 0.75)'
        : 'rgba(255, 255, 255, 0.45)',
      colorTextPlaceholder: isLightTheme
        ? 'rgba(0, 0, 0, 0.25)'
        : 'rgba(220, 186, 224, 0.6)',
      colorText: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
      colorTextHeading: isLightTheme ? '#000' : '#E4DEE4',
      colorTextDescription: isLightTheme ? 'rgba(0, 0, 0, 0.45)' : '#B7A6B3',
    },
    components: {
      Switch: { trackMinWidth: 60 },
      Descriptions: {
        colorSplit: isLightTheme
          ? 'rgba(5, 5, 5, 0.06)'
          : 'rgba(255, 255, 255, 0.25)',
        titleColor: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
        contentColor: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
        extraColor: isLightTheme ? '#000000' : 'rgba(255, 255, 255, 0.65)',
        labelBg: isLightTheme
          ? 'rgba(210, 154, 218, 0.1)'
          : 'rgba(210, 154, 218, 0.1)',
      },
    },
  }
}
