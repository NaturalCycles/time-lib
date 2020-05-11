import type { IDayjsInstance, PluginFunc } from '../dayjs/types'

export const isoWeekdayPlugin: PluginFunc = (_opt, dayjsClass) => {
  dayjsClass.prototype.isoWeekday = function (this: IDayjsInstance, setWeekday?: number) {
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
