import { dayjs, Dayjs, DayjsLocale } from './dayjs.full'
import { DAYJS_TIME_HM, DAYJS_TIME_HMS } from './plugin/default'
import { ms, since, TS_2018_06_21 } from './time.util'

export {
  dayjs, // should be imported from dayjs.full, cause it's an extended version
  Dayjs,
  DayjsLocale,
  TS_2018_06_21,
  since,
  ms,
  DAYJS_TIME_HM,
  DAYJS_TIME_HMS,
}
