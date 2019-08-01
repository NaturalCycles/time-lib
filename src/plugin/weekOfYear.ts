import { Dayjs, PluginFunc } from 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    /**
     * Returns iso week number (where week starts on Monday)
     */
    week (): number

    /**
     * Set date to NEXT date that satisfies the week number.
     */
    // week (value: number): Dayjs // not supported
  }
}

export const weekOfYearPlugin: PluginFunc = (_opt, dayjsClass, dayjs) => {
  dayjsClass.prototype.week = function (this: Dayjs) {
    const weekStart = this.$locale().weekStart || 0

    if (weekStart === 1) {
      // ISO implementation
      // // Based on: https://stackoverflow.com/a/6117889/4919972
      const d = new Date(Date.UTC(this.year(), this.month(), this.date()))
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
      // Get first day of year
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      // Calculate full weeks to nearest Thursday
      return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
    } else if (weekStart === 0) {
      // US implementation
      // Based on: https://github.com/iamkun/dayjs/blob/dev/src/plugin/weekOfYear/index.js
      // d(this) clone is for badMutable plugin
      const endOfYear = dayjs(this).endOf('y')
      if (endOfYear.day() !== 6 && this.month() === 11 && 31 - this.date() <= endOfYear.day()) {
        return 1
      }
      const startOfYear = dayjs(this).startOf('y')
      const compareDay = startOfYear.subtract(startOfYear.day(), 'd').subtract(1, 'ms')
      const diffInWeek = this.diff(compareDay, 'w', true)
      return Math.ceil(diffInWeek)
    } else {
      throw new Error(`.week() plugin for weekStart=${weekStart} is not supported yet:(`)
    }
  }
}
