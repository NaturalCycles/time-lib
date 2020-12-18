import { _filterNullishValues, _range } from '@naturalcycles/js-lib'
import moment = require('moment')
import { dayjs } from '../index'

// Dayjs locales:
// en (US): all defaults (weekStart=0, yearStart=undefined, which means 1 (1st of January?))
// en-ca: same as US
// en-GB: weekStart=1 (Monday), yearStart=4 (Thursday)
// ar: weekStart=6 (Saturday), yearStart=undefined (wrong, should be 12!)

// Moment locales:
// en (US): not present (default?)
// en-ca: dow=undefined (default), doy=undefined (default)
// en-GB: dow=1 (Monday), doy=4 (Thursday)
// ar: dow=6 (Saturday), doy=12

// const weekStarts = [0, 1, 6]
// Based on: https://github.com/moment/momentjs.com/issues/279#issuecomment-375611003
const presets = [
  // ISO-8601: Europe
  {
    name: 'iso',
    dow: 1,
    doy: 4, // 1st week of the year is the one that contains the first Thursday (7 + 1 - 4)
  },
  // US, Canada
  {
    name: 'us',
    dow: 0,
    doy: 6, // 1st week of the year is the one that contains the 1st of January (7 + 0 - 1)
  },
  // // Most of Arab countries
  {
    name: 'arab',
    dow: 6, // Saturday is the first day of the week.
    doy: 12, // The week that contains Jan 12th is the first week of the year. (7 + 6 - 1)
  },
]

const startDate = '1999-01-01'

test('weekOfYear', () => {
  presets.forEach(preset => {
    const { dow, doy, name } = preset
    dayjs.updateLocale(
      dayjs.locale(),
      _filterNullishValues({
        weekStart: dow,
        yearStart: doy, // dayjs doesn't need it, it has a different understanding of it
      }),
    )

    moment.updateLocale('en', {
      week: _filterNullishValues({
        dow,
        doy,
      }),
    })

    _range(50_000).forEach(n => {
      const d = dayjs(startDate).add(n, 'day')
      const isoWeek1 = d.week()
      const isoWeek2 = moment(startDate).add(n, 'day').week()
      // console.log(`${d.toISODate()}: ${d.isoWeek()}`)

      if (isoWeek1 !== isoWeek2) {
        // fail(`${d.toISODate()} dayjs: ${d.isoWeek()}, moment: ${dm.isoWeek()}`)
        throw new Error(
          `preset=${name} ${d.toISODate()} weekday=${d.isoWeekday()} dayjs: ${isoWeek1}, moment: ${isoWeek2}`,
        )
      }
    })
  })
})
