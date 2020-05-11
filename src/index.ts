import { dayjs } from './dayjs.full'
import { DAYJS_TIME_HM, DAYJS_TIME_HMS } from './plugin/default'
import { IDayjs, IDayjsFactory, IDayjsLocale } from './types'

export {
  dayjs, // should be imported from dayjs.full, cause it's an extended version
  IDayjsFactory,
  IDayjs,
  IDayjsLocale,
  DAYJS_TIME_HM,
  DAYJS_TIME_HMS,
  // loadDayjsLocales,
  // loadDayjsPlugins,
}
