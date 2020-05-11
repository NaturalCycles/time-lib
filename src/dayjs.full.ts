import { dayjs } from './dayjs'

import { defaultPlugins } from './plugin/default'
import { isoWeekdayPlugin } from './plugin/isoWeekday'
import { weekOfYearPlugin } from './plugin/weekOfYear'

dayjs.extend(require('./dayjs/plugin/utc').default)
dayjs.extend(require('./dayjs/plugin/isSameOrAfter').default)
dayjs.extend(require('./dayjs/plugin/isSameOrBefore').default)
dayjs.extend(require('./dayjs/plugin/relativeTime').default)
dayjs.extend(require('./dayjs/plugin/isBetween').default)
dayjs.extend(require('./dayjs/plugin/minMax').default)
dayjs.extend(require('./dayjs/plugin/localizedFormat').default)
dayjs.extend(require('./dayjs/plugin/localeData').default)
dayjs.extend(require('./dayjs/plugin/updateLocale').default)
dayjs.extend(defaultPlugins)
dayjs.extend(isoWeekdayPlugin)
dayjs.extend(weekOfYearPlugin)

dayjs.locale('en-gb')

export { dayjs }
