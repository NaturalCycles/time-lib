/* tslint:disable */

import * as C from './constant'
// Kirill: en-GB is used by default (not en, which is en-US). To have Monday as fdow, for example
// import * as en from './locale/en'
import enGB from './locale/en-gb'
import { ConfigType, IDayjs, ILocale, OpUnitType } from './types'

let L = 'en-gb' // global locale
const Ls: { [key: string]: ILocale } = {} // global loaded locale
Ls[L] = enGB as any

const parseLocale = (
  preset: string | ILocale,
  object?: Partial<ILocale> | null,
  isLocal?: boolean,
) => {
  let l
  if (!preset) return L
  if (typeof preset === 'string') {
    if (Ls[preset]) {
      l = preset
    }
    if (object) {
      ;(Ls as any)[preset] = object
      l = preset
    }
  } else {
    const { name } = preset
    Ls[name] = preset
    l = name
  }
  if (!isLocal && l) L = l
  return l || (!isLocal && L)
}

const isDayjs = (d: any): d is Dayjs => d instanceof Dayjs // eslint-disable-line no-use-before-define

const isUndefined = (s: any): s is undefined => s === undefined

const wrapper = (date: ConfigType, instance: Dayjs): Dayjs =>
  _dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    $offset: instance.$offset, // todo: refactor; do not use this.$offset in you code
  })

const parseDate = (cfg: any): Date => {
  const { date, utc } = cfg
  if (date === null) return new Date(NaN) // null is invalid
  if (isUndefined(date)) return new Date() // today
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(C.REGEX_PARSE) as any
    if (d) {
      if (utc) {
        return new Date(
          Date.UTC(d[1], d[2] - 1, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, d[7] || 0),
        )
      }
      return new Date(d[1], d[2] - 1, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, d[7] || 0)
    }
  }

  return new Date(date) // everything else
}

const padStart = (string: any, length: number, pad: string): string => {
  const s = String(string)
  if (!s || s.length >= length) return string
  return `${Array(length + 1 - s.length).join(pad)}${string}`
}

const padZoneStr = (instance: Dayjs): string => {
  const negMinuts = -instance.utcOffset()
  const minutes = Math.abs(negMinuts)
  const hourOffset = Math.floor(minutes / 60)
  const minuteOffset = minutes % 60
  return `${negMinuts <= 0 ? '+' : '-'}${padStart(hourOffset, 2, '0')}:${padStart(
    minuteOffset,
    2,
    '0',
  )}`
}

const monthDiff = (a: any, b: any): number => {
  // function from moment.js in order to keep the same result
  const wholeMonthDiff =
    ((b.year() as number) - (a.year() as number)) * 12 + (b.month() - a.month())
  const anchor = a.clone().add(wholeMonthDiff, C.M)
  const c = b - anchor < 0
  const anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), C.M)
  return Number(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0)
}

const absFloor = (n: number): number => (n < 0 ? Math.ceil(n) || 0 : Math.floor(n))

const prettyUnit = (u?: OpUnitType): string => {
  const special = {
    M: C.M,
    y: C.Y,
    w: C.W,
    d: C.D,
    D: C.DATE,
    h: C.H,
    m: C.MIN,
    s: C.S,
    ms: C.MS,
    Q: C.Q,
  }
  return (
    special[u!] ||
    String(u || '')
      .toLowerCase()
      .replace(/s$/, '')
  )
}

const Utils = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined,
  l: parseLocale,
  i: isDayjs,
  w: wrapper,
}

const _dayjs = function (date: ConfigType, c?: any): Dayjs {
  if (isDayjs(date)) {
    return date.clone() as Dayjs
  }
  // eslint-disable-next-line no-nested-ternary
  const cfg = typeof c === 'object' ? c : {}
  cfg.date = date
  cfg.args = arguments // eslint-disable-line prefer-rest-params
  return new Dayjs(cfg) // eslint-disable-line no-use-before-define
} as any

export class Dayjs {
  constructor(cfg?: ConfigType) {
    this.$L = this.$L || parseLocale((cfg as any).locale, null, true)
    this.parse(cfg) // for plugin
  }

  $L!: any
  $d!: Date
  $y!: number
  $M!: number
  $D!: number
  $W!: number
  $H!: number
  $m!: number
  $s!: number
  $ms!: number

  $u!: number // utc?
  $offset!: number

  parse(cfg?: ConfigType): void {
    this.$d = parseDate(cfg)
    this.init()
  }

  init(): void {
    const { $d } = this
    this.$y = $d.getFullYear()
    this.$M = $d.getMonth()
    this.$D = $d.getDate()
    this.$W = $d.getDay()
    this.$H = $d.getHours()
    this.$m = $d.getMinutes()
    this.$s = $d.getSeconds()
    this.$ms = $d.getMilliseconds()
  }

  // eslint-disable-next-line class-methods-use-this
  $utils() {
    return Utils
  }

  isValid(): boolean {
    return !(this.$d.toString() === C.INVALID_DATE_STRING)
  }

  isSame(that: ConfigType, units: OpUnitType): boolean {
    const other = _dayjs(that)
    return this.startOf(units) <= other && other <= this.endOf(units)
  }

  isAfter(that: ConfigType, units?: OpUnitType) {
    return _dayjs(that) < this.startOf(units)
  }

  isBefore(that: ConfigType, units?: OpUnitType) {
    return this.endOf(units) < _dayjs(that)
  }

  $g<SET extends any>(
    input: any,
    get: keyof Dayjs,
    set?: OpUnitType,
  ): SET extends undefined ? number : Dayjs {
    if (Utils.u(input)) return this[get] as any
    return this.set(set!, input) as any
  }

  year<T extends number | undefined>(input?: T): T extends undefined ? number : Dayjs {
    return this.$g(input, '$y', C.Y)
  }

  month(input?: number) {
    return this.$g(input, '$M', C.M)
  }

  day(input?: number) {
    return this.$g(input, '$W', C.D)
  }

  date(input?: number) {
    return this.$g(input, '$D', C.DATE)
  }

  hour(input?: number) {
    return this.$g(input, '$H', C.H)
  }

  minute(input?: number) {
    return this.$g(input, '$m', C.MIN)
  }

  second(input?: number) {
    return this.$g(input, '$s', C.S)
  }

  millisecond(input?: number) {
    return this.$g(input, '$ms', C.MS)
  }

  unix(): number {
    return Math.floor(this.valueOf() / 1000)
  }

  valueOf(): number {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime()
  }

  startOf(units?: OpUnitType, startOf?: any): Dayjs {
    // startOf -> endOf
    const isStartOf = !Utils.u(startOf) ? startOf : true
    const unit = Utils.p(units)
    const instanceFactory = (d: number, m: number) => {
      const ins = Utils.w(this.$u ? Date.UTC(this.$y, m, d) : new Date(this.$y, m, d), this)
      return isStartOf ? ins : ins.endOf(C.D)
    }
    const instanceFactorySet = (method: any, slice?: number) => {
      const argumentStart = [0, 0, 0, 0]
      const argumentEnd = [23, 59, 59, 999]
      return Utils.w(
        this.toDate()[method].apply(
          // eslint-disable-line prefer-spread
          (this as any).toDate('s'),
          (isStartOf ? argumentStart : argumentEnd).slice(slice),
        ),
        this,
      )
    }
    const { $W, $M, $D } = this
    const utcPad = `set${this.$u ? 'UTC' : ''}`
    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11)
      case C.M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1)
      case C.W: {
        const weekStart = this.$locale().weekStart || 0
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M)
      }
      case C.D:
      case C.DATE:
        return instanceFactorySet(`${utcPad}Hours`, 0)
      case C.H:
        return instanceFactorySet(`${utcPad}Minutes`, 1)
      case C.MIN:
        return instanceFactorySet(`${utcPad}Seconds`, 2)
      case C.S:
        return instanceFactorySet(`${utcPad}Milliseconds`, 3)
      default:
        return this.clone()
    }
  }

  endOf(arg?: OpUnitType) {
    return this.startOf(arg, false)
  }

  $set(units: OpUnitType, int: number): Dayjs {
    // private set
    const unit = Utils.p(units)
    const utcPad = `set${this.$u ? 'UTC' : ''}`
    const name = {
      [C.D]: `${utcPad}Date`,
      [C.DATE]: `${utcPad}Date`,
      [C.M]: `${utcPad}Month`,
      [C.Y]: `${utcPad}FullYear`,
      [C.H]: `${utcPad}Hours`,
      [C.MIN]: `${utcPad}Minutes`,
      [C.S]: `${utcPad}Seconds`,
      [C.MS]: `${utcPad}Milliseconds`,
    }[unit]
    const arg = unit === C.D ? this.$D + (int - this.$W) : int

    if (unit === C.M || unit === C.Y) {
      // clone is for badMutable plugin
      const date = this.clone().set(C.DATE, 1)
      date.$d[name](arg)
      date.init()
      this.$d = date.set(C.DATE, Math.min(this.$D, date.daysInMonth())).toDate()
    } else if (name) this.$d[name](arg)

    this.init()
    return this
  }

  set(string: OpUnitType, int: number): Dayjs {
    return this.clone().$set(string, int)
  }

  get(unit: OpUnitType) {
    return this[Utils.p(unit)]()
  }

  add(number: any, units: OpUnitType): Dayjs {
    number = Number(number) // eslint-disable-line no-param-reassign
    const unit = Utils.p(units)
    const instanceFactorySet = (n: number) => {
      const d = _dayjs(this as any)
      return Utils.w(d.date((d.date() as number) + Math.round(n * number)) as number, this)
    }
    if (unit === C.M) {
      return this.set(C.M, this.$M + number)
    }
    if (unit === C.Y) {
      return this.set(C.Y, this.$y + number)
    }
    if (unit === C.D) {
      return instanceFactorySet(1)
    }
    if (unit === C.W) {
      return instanceFactorySet(7)
    }
    const step =
      {
        [C.MIN]: C.MILLISECONDS_A_MINUTE,
        [C.H]: C.MILLISECONDS_A_HOUR,
        [C.S]: C.MILLISECONDS_A_SECOND,
      }[unit] || 1 // ms

    const nextTimeStamp = this.$d.getTime() + number * step
    return Utils.w(nextTimeStamp, this)
  }

  subtract(number: number, string: OpUnitType) {
    return this.add(number * -1, string)
  }

  format(this: Dayjs, formatStr?: string): string {
    if (!this.isValid()) return C.INVALID_DATE_STRING

    const str = formatStr || C.FORMAT_DEFAULT
    const zoneStr = Utils.z(this)
    const locale = this.$locale()
    const { $H, $m, $M } = this
    const { weekdays, months, meridiem } = locale
    const getShort = (arr: any, index: number, full?: any, length?: number) =>
      (arr && (arr[index] || arr(this, str))) || full[index].substr(0, length)
    const get$H = (num: number): string => Utils.s($H % 12 || 12, num, '0')

    const meridiemFunc =
      meridiem ||
      ((hour: number, minute: number, isLowercase?: boolean) => {
        const m = hour < 12 ? 'AM' : 'PM'
        return isLowercase ? m.toLowerCase() : m
      })

    const matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, '0'),
      MMM: getShort(locale.monthsShort, $M, months, 3),
      MMMM: months[$M] || months(this, str),
      D: this.$D,
      DD: Utils.s(this.$D, 2, '0'),
      d: String(this.$W),
      dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, '0'),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, '0'),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, '0'),
      SSS: Utils.s(this.$ms, 3, '0'),
      Z: zoneStr, // 'ZZ' logic below
    }

    return str.replace(
      C.REGEX_FORMAT,
      (match, $1) => $1 || matches[match] || zoneStr.replace(':', ''),
    ) // 'ZZ'
  }

  utcOffset(): number {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15
  }

  diff(input: ConfigType, units: OpUnitType, float?: boolean): number {
    const unit = Utils.p(units)
    const that = _dayjs(input)
    const zoneDelta = (that.utcOffset() - this.utcOffset()) * C.MILLISECONDS_A_MINUTE
    const diff = (this as any) - (that as any)
    let result = Utils.m(this, that)

    result =
      {
        [C.Y]: result / 12,
        [C.M]: result,
        [C.Q]: result / 3,
        [C.W]: (diff - zoneDelta) / C.MILLISECONDS_A_WEEK,
        [C.D]: (diff - zoneDelta) / C.MILLISECONDS_A_DAY,
        [C.H]: diff / C.MILLISECONDS_A_HOUR,
        [C.MIN]: diff / C.MILLISECONDS_A_MINUTE,
        [C.S]: diff / C.MILLISECONDS_A_SECOND,
      }[unit] || diff // milliseconds

    return float ? result : Utils.a(result)
  }

  daysInMonth() {
    return this.endOf(C.M).$D
  }

  $locale() {
    // get locale object
    return Ls[this.$L]!
  }

  locale(preset: any, object: any) {
    if (!preset) return this.$L
    const that = this.clone()
    const nextLocaleName = parseLocale(preset, object, true)
    if (nextLocaleName) that.$L = nextLocaleName
    return that
  }

  clone() {
    return Utils.w(this.$d, this)
  }

  toDate() {
    return new Date(this.valueOf())
  }

  toJSON() {
    return this.isValid() ? this.toISOString() : null
  }

  toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString()
  }

  toString() {
    return this.$d.toUTCString()
  }
}

_dayjs.prototype = Dayjs.prototype

_dayjs.extend = (plugin: any, option: any) => {
  plugin(option, Dayjs, _dayjs)
  return _dayjs
}

_dayjs.locale = parseLocale

_dayjs.isDayjs = isDayjs

_dayjs.unix = (timestamp: number) => _dayjs(timestamp * 1e3)

_dayjs.en = Ls[L]
_dayjs.Ls = Ls

export const dayjs: IDayjs = _dayjs as any
