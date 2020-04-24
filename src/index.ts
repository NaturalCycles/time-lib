import { dayjs, Dayjs, DayjsLocale } from './dayjs.full'
import { loadDayjsLocales } from './locales'
import { DAYJS_TIME_HM, DAYJS_TIME_HMS } from './plugin/default'
import { loadDayjsPlugins } from './plugins'

export {
  dayjs, // should be imported from dayjs.full, cause it's an extended version
  Dayjs,
  DayjsLocale,
  DAYJS_TIME_HM,
  DAYJS_TIME_HMS,
  loadDayjsLocales,
  loadDayjsPlugins,
}
