import * as dayjs from 'dayjs'

export interface DayjsLocale {
  name: string
  weekStart?: number
  weekdays?: string[]
  months?: string[]
  [k: string]: any
  // todo: complete
  // Doc: https://github.com/iamkun/dayjs/blob/dev/docs/en/I18n.md#customize
}

declare module 'dayjs' {
  interface Dayjs {
    /**
     * Returns internal locale data
     */
    $locale(): DayjsLocale
  }

  export function extendLocale(ext: Partial<DayjsLocale>): void
}

;(dayjs as any).extendLocale = function(ext: any) {
  dayjs.locale({
    ...dayjs().$locale(),
    ...ext,
  })
}
