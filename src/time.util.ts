import dayjs = require('dayjs')
import utc = require('dayjs/plugin/utc')
import 'dayjs/plugin/utc'
import { dayjsPlugins } from './dayjs.plugins'
dayjs.extend(utc)
dayjs.extend(dayjsPlugins)

// export modified dayjs
export { dayjs }

export const DAYJS_2018_06_21 = dayjs('2018-06-21')

export function nowUnix (): number {
  return dayjs().unix()
}

export function nowPretty (): string {
  return dayjs().toPretty()
}

export function todayIso (): string {
  return dayjs().toISODate()
}

/**
 * Returns time passed since `from` until `until` (default to Date.now())
 */
export function since (from: number, until = Date.now()): string {
  return ms(until - from)
}

/**
 * Returns, e.g:
 * 125 ms
 * 1.125 sec
 * 11 sec
 */
export function ms (millis: number): string {
  if (millis >= 10000) {
    return `${Math.round(millis / 1000)} sec`
  }

  if (millis >= 1000) {
    return `${(millis / 1000).toFixed(3)} sec`
  }

  return `${Math.round(millis)} ms`
}
