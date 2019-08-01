import { dayjs, Dayjs } from './dayjs.full'
import { DayjsLocale } from './plugin/localeData'
import { ms, since, TS_2018_06_21 } from './time.util'

export {
  dayjs, // should be imported from dayjs.full, cause it's an extended version
  Dayjs,
  DayjsLocale,
  TS_2018_06_21,
  since,
  ms,
}
