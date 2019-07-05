import { Dayjs, PluginFunc } from 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    /**
     * 1: Monday
     * ...
     * 6: Saturday
     * 7: Sunday
     */
    isoWeekday (): number
  }
}

export const isoWeekdayPlugin: PluginFunc = (_opt, dayjsClass) => {
  dayjsClass.prototype.isoWeekday = function (this: Dayjs) {
    const { $W } = this as any
    return $W <= 0 ? $W + 7 : $W
  }
}
