// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
import { dayjs } from '../index'

const locale = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
    '_',
  ),
} as any

dayjs.locale(locale, null, true)

export default locale
