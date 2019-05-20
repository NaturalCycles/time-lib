import { Dayjs, PluginFunc } from 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    /**
     * Returns ISO date, e.g `2018-06-21`
     */
    toISODate (): string

    /**
     * Returns e.g `2018-06-21 17:54:21`
     */
    toPretty (): string

    /**
     * Returns e.g `20180621_1754` or `20180621_175404` (with seconds).
     */
    toCompactTime (seconds?: boolean): string
  }
}

export const DAYJS_ISO_DATE = 'YYYY-MM-DD'
export const DAYJS_PRETTY_TIME = 'YYYY-MM-DD HH:mm:ss'
export const DAYJS_COMPACT_TIME = 'YYYYMMDD_HHmm'
export const DAYJS_COMPACT_TIME_SECONDS = 'YYYYMMDD_HHmmss'

export const dayjsPlugins: PluginFunc = (_opt, dayjsClass, _dayjsFactory) => {
  dayjsClass.prototype.toISODate = function (this: Dayjs) {
    return this.format(DAYJS_ISO_DATE)
  }

  dayjsClass.prototype.toPretty = function (this: Dayjs) {
    return this.format(DAYJS_PRETTY_TIME)
  }

  dayjsClass.prototype.toCompactTime = function (this: Dayjs, seconds = false) {
    return this.format(seconds ? DAYJS_COMPACT_TIME_SECONDS : DAYJS_COMPACT_TIME)
  }
}
