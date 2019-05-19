import { DAYJS_ISO_DATE, DAYJS_PRETTY_TIME } from './dayjs.plugins'
import { dayjs, DAYJS_2018_06_21, ms, nowPretty, nowUnix, since, todayIso } from './time.util'

export {
  dayjs, // should be imported from time.util, cause it's an extended version
  DAYJS_ISO_DATE,
  DAYJS_PRETTY_TIME,
  DAYJS_2018_06_21,
  nowUnix,
  nowPretty,
  todayIso,
  since,
  ms,
}
