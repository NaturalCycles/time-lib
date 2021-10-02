import * as dayjsLib from 'dayjs'
// const dayjsLib = require('dayjs')
const dayjs: IDayjsFactory = dayjsLib as any

import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'
import { weekOfYearPlugin } from './plugin/weekOfYear'
import type { IDayjsFactory } from './types'

import * as isBetween from 'dayjs/plugin/isBetween'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as localeData from 'dayjs/plugin/localeData'
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import * as minMax from 'dayjs/plugin/minMax'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import * as updateLocale from 'dayjs/plugin/updateLocale'
import * as utc from 'dayjs/plugin/utc'
dayjsLib.extend(utc)
dayjsLib.extend(isSameOrAfter)
dayjsLib.extend(isSameOrBefore)
dayjsLib.extend(relativeTime)
dayjsLib.extend(isBetween)
dayjsLib.extend(minMax)
dayjsLib.extend(localizedFormat)
dayjsLib.extend(localeData)
dayjsLib.extend(updateLocale)
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)
dayjs.extend(weekOfYearPlugin)
// dayjs.extend(require('dayjs/plugin/weekOfYear'))

// Set en-gb by default, to have e.g Monday as fdow
import * as enGB from 'dayjs/locale/en-gb'
dayjsLib.locale(enGB)

export { dayjs }
