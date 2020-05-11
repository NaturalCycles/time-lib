export type ConfigType = string | number | Date | IDayjsInstance

export type OptionType = { locale?: string; format?: string; utc?: boolean } | string

export type UnitTypeShort = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'
export type UnitType =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'date'
  | UnitTypeShort

export type OpUnitType = UnitType | 'week' | 'w'
export type QUnitType = UnitType | 'quarter' | 'Q'

export type PluginFunc<T = unknown> = (option: T, c: IDayjs, d: IDayjs) => void

export interface IDayjs {
  (cfg?: ConfigType): IDayjsInstance

  unix(t: number): IDayjsInstance

  extend<T = unknown>(plugin: PluginFunc<T>, option?: T): IDayjs

  locale(preset?: string | ILocale, object?: Partial<ILocale> | null, isLocal?: boolean): string

  isDayjs(d: any): d is IDayjsInstance

  // Plugins are copy-pasted there now:
  utc(config?: ConfigType, format?: string): IDayjsInstance

  max(dayjs: IDayjsInstance[]): IDayjsInstance
  max(...dayjs: IDayjsInstance[]): IDayjsInstance
  min(dayjs: IDayjsInstance[]): IDayjsInstance
  min(...dayjs: IDayjsInstance[]): IDayjsInstance

  updateLocale(localeName: string, customConfig: object): any
  Ls: { [localeName: string]: ILocale }
}

export interface IDayjsInstance {
  clone(): IDayjsInstance

  isValid(): boolean

  year(): number

  year(value: number): IDayjsInstance

  month(): number

  month(value: number): IDayjsInstance

  date(): number

  date(value: number): IDayjsInstance

  day(): number

  day(value: number): IDayjsInstance

  hour(): number

  hour(value: number): IDayjsInstance

  minute(): number

  minute(value: number): IDayjsInstance

  second(): number

  second(value: number): IDayjsInstance

  millisecond(): number

  millisecond(value: number): IDayjsInstance

  set(unit: UnitType, value: number): IDayjsInstance

  get(unit: UnitType): number

  add(value: number, unit: OpUnitType): IDayjsInstance

  subtract(value: number, unit: OpUnitType): IDayjsInstance

  startOf(unit: OpUnitType): IDayjsInstance

  endOf(unit: OpUnitType): IDayjsInstance

  format(template?: string): string

  diff(date: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number

  // Forbid the method in favor of .unixMillis()
  // valueOf(): number

  unix(): number

  daysInMonth(): number

  toDate(): Date

  toJSON(): string

  // Forbid the method in favor of .toISODate()
  // toISOString(): string

  toString(): string

  utcOffset(): number
  utcOffset(offset: number): IDayjsInstance

  isBefore(date: ConfigType, unit?: OpUnitType): boolean

  isSame(date: ConfigType, unit?: OpUnitType): boolean

  isAfter(date: ConfigType, unit?: OpUnitType): boolean

  locale(): string

  locale(preset: string | ILocale, object?: Partial<ILocale>): IDayjsInstance

  locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  // default plugin here
  /**
   * Returns ISO date, e.g `2018-06-21`
   */
  toISODate(): string

  /**
   * Returns e.g `2018-06-21 17:54:21`
   * or `2018-06-21 17:54` (with seconds=false)
   * @param seconds defauls to true
   */
  toPretty(seconds?: boolean): string

  /**
   * Returns e.g `20180621_1754` or `20180621_175404` (with seconds).
   * seconds @default to false
   */
  toCompactTime(seconds?: boolean): string

  /**
   * Returns e.g `20180621`
   */
  toCompactDate(): string

  /**
   * Returns unixtime in milliseconds.
   */
  unixMillis(): number

  /**
   * Shortcut for .startOf('day')
   */
  today(): IDayjsInstance

  // isoWeekDay plugin here
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

  // weekOfYear plugin here
  /**
   * Returns iso week number (where week starts on Monday)
   */
  week(): number

  /**
   * Set date to NEXT date that satisfies the week number.
   */
  // week (value: number): Dayjs // not supported

  // copy-pasting plugin types here for now
  // isBetween
  isBetween(a: ConfigType, b: ConfigType, c?: OpUnitType | null, d?: string): boolean

  utc(): IDayjsInstance
  local(): IDayjsInstance
  isUTC(): boolean

  isSameOrAfter(date: ConfigType, unit?: OpUnitType): boolean
  isSameOrBefore(date: ConfigType, unit?: OpUnitType): boolean

  fromNow(withoutSuffix?: boolean): string
  from(compared: ConfigType, withoutSuffix?: boolean): string
  toNow(withoutSuffix?: boolean): string
  to(compared: ConfigType, withoutSuffix?: boolean): string
  /**
   * Returns internal locale data
   */
  $locale(): ILocale
  localeData(): ILocale
}

export interface ILocale {
  name: string
  weekdays: string[]
  months: string[] | any // todo
  weekStart?: number
  weekdaysShort?: string[]
  monthsShort?: string[]
  weekdaysMin?: string[]
  meridiem?: any
  ordinal?: (n: number) => number | string
  formats: Partial<{
    LT: string
    LTS: string
    L: string
    LL: string
    LLL: string
    LLLL: string
  }>
  relativeTime: Partial<{
    future: string
    past: string
    s: string
    m: string
    mm: string
    h: string
    hh: string
    d: string
    dd: string
    M: string
    MM: string
    y: string
    yy: string
  }>
}

export interface RelativeTimeThreshold {
  l: string
  r?: number
  d?: string
}

export interface RelativeTimeOptions {
  rounding?: (num: number) => number
  thresholds?: RelativeTimeThreshold[]
}
