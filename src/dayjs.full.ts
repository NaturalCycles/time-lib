// import dayjsLib = require('dayjs')
const dayjsLib = require('dayjs')
const dayjs: IDayjsFactory = dayjsLib

import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'
import { weekOfYearPlugin } from './plugin/weekOfYear'
import type { IDayjsFactory } from './types'

dayjs.extend(require('dayjs/plugin/utc'))
dayjs.extend(require('dayjs/plugin/isSameOrAfter'))
dayjs.extend(require('dayjs/plugin/isSameOrBefore'))
dayjs.extend(require('dayjs/plugin/relativeTime'))
dayjs.extend(require('dayjs/plugin/isBetween'))
dayjs.extend(require('dayjs/plugin/minMax'))
dayjs.extend(require('dayjs/plugin/localizedFormat'))
dayjs.extend(require('dayjs/plugin/localeData'))
dayjs.extend(require('dayjs/plugin/updateLocale'))
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)
dayjs.extend(weekOfYearPlugin)
// dayjs.extend(require('dayjs/plugin/weekOfYear'))

// Set en-gb by default, to have e.g Monday as fdow
require(`dayjs/locale/en-gb`)
dayjs.locale('en-gb')

export { dayjs }
