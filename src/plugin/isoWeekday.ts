import type { Dayjs, PluginFunc } from 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    /**
     * 1: Monday
     * ...
     * 6: Saturday
     * 7: Sunday
     */
    isoWeekday(): number

    /**
     * Set date to NEXT date that satisfies the weekday.
     */
    isoWeekday(setWeekday: number): this
  }
}

export const isoWeekdayPlugin: PluginFunc = (_opt, dayjsClass) => {
  dayjsClass.prototype.isoWeekday = function (this: Dayjs, setWeekday?: number) {
    const { $W } = this as any
    const weekday = $W <= 0 ? $W + 7 : $W

    if (setWeekday) {
      let diff = setWeekday - weekday
      if (diff < 0) diff += 7

      return this.add(diff, 'day')
    }

    return weekday
  }
}
