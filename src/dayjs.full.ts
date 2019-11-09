import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'
import { weekOfYearPlugin } from './plugin/weekOfYear'

dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)
dayjs.extend(isBetween)
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)
dayjs.extend(weekOfYearPlugin)

// Necessary to import these files, cause they contain augmentation of Dayjs namespace
import 'dayjs/plugin/isBetween'
import 'dayjs/plugin/isSameOrAfter'
import 'dayjs/plugin/isSameOrBefore'
import 'dayjs/plugin/relativeTime'
import 'dayjs/plugin/utc'
import './plugin/default'
import './plugin/isoWeekday'
import './plugin/weekOfYear'

export interface DayjsLocale {
  name: string
  weekStart?: number
  weekdays?: string[]
  months?: string[]
  [k: string]: any
  // todo: complete
  // Doc: https://github.com/iamkun/dayjs/blob/dev/docs/en/I18n.md#customize
}

declare module 'dayjs' {
  interface Dayjs {
    /**
     * Returns internal locale data
     */
    $locale(): DayjsLocale
  }

  export function extendLocale(ext: Partial<DayjsLocale>): void
}

;(dayjs as any).extendLocale = function(ext: any) {
  dayjs.locale({
    ...dayjs().$locale(),
    ...ext,
  })
}

// Default weekStart to Monday
dayjs.extendLocale({
  weekStart: 1,
})

type Dayjs = typeof dayjs

export { Dayjs, dayjs }
