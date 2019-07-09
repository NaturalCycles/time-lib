import dayjs = require('dayjs')
import { Dayjs } from 'dayjs'
import * as isBetween from 'dayjs/plugin/isBetween'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import * as utc from 'dayjs/plugin/utc'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'
import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'

dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(relativeTime)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)

// Necessary to import these files, cause they contain augmentation of Dayjs namespace
import 'dayjs/plugin/isBetween'
import 'dayjs/plugin/isSameOrAfter'
import 'dayjs/plugin/isSameOrBefore'
import 'dayjs/plugin/relativeTime'
import 'dayjs/plugin/utc'
import 'dayjs/plugin/weekOfYear'
import './plugin/default'
import './plugin/isoWeekday'

export { Dayjs, dayjs }
