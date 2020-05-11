const dayjs = require('./vendor/dayjs').default as IDayjs

import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'
import { weekOfYearPlugin } from './plugin/weekOfYear'
import type { IDayjs } from './types'

dayjs.extend(require('./vendor/dayjs/plugin/utc').default)
dayjs.extend(require('./vendor/dayjs/plugin/isSameOrAfter').default)
dayjs.extend(require('./vendor/dayjs/plugin/isSameOrBefore').default)
dayjs.extend(require('./vendor/dayjs/plugin/relativeTime').default)
dayjs.extend(require('./vendor/dayjs/plugin/isBetween').default)
dayjs.extend(require('./vendor/dayjs/plugin/minMax').default)
dayjs.extend(require('./vendor/dayjs/plugin/localizedFormat').default)
dayjs.extend(require('./vendor/dayjs/plugin/localeData').default)
dayjs.extend(require('./vendor/dayjs/plugin/updateLocale').default)
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)
dayjs.extend(weekOfYearPlugin)

// Set en-gb by default, to have e.g Monday as fdow
require(`./vendor/dayjs/locale/en-gb`)
dayjs.locale('en-gb')

export { dayjs }
