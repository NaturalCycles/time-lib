/* tslint:disable */

export default (option: any, Dayjs: any, dayjs: any) => {
  dayjs.updateLocale = function (locale: any, customConfig: any) {
    const localeList = dayjs.Ls
    const localeConfig = localeList[locale]
    if (!localeConfig) return
    const customConfigKeys = customConfig ? Object.keys(customConfig) : []
    customConfigKeys.forEach(c => {
      localeConfig[c] = customConfig[c]
    })
    return localeConfig // eslint-disable-line consistent-return
  }
}
