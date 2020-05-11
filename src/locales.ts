/**
 * It probably only works in Node.
 */
export function loadDayjsLocales(locales: string[]): void {
  locales.forEach(locale => {
    require(`./vendor/dayjs/locale/${locale}`)
  })
}
