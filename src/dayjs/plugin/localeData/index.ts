/* tslint:disable */

export default (o: any, c: any, dayjs: any) => {
  // locale needed later
  const proto = c.prototype
  const getShort = (ins: any, target: any, full?: any, num?: any) => {
    const locale = ins.name ? ins : ins.$locale()
    if (!locale[target]) {
      return locale[full].map((f: any) => f.substr(0, num))
    }
    return locale[target]
  }
  const getDayjsLocaleObject = () => dayjs.Ls[dayjs.locale()]
  const localeData = function (this: any) {
    return {
      months: (instance: any) => (instance ? instance.format('MMMM') : getShort(this, 'months')),
      monthsShort: (instance: any) =>
        instance ? instance.format('MMM') : getShort(this, 'monthsShort', 'months', 3),
      firstDayOfWeek: () => this.$locale().weekStart || 0,
      weekdaysMin: (instance: any) =>
        instance ? instance.format('dd') : getShort(this, 'weekdaysMin', 'weekdays', 2),
      weekdaysShort: (instance: any) =>
        instance ? instance.format('ddd') : getShort(this, 'weekdaysShort', 'weekdays', 3),
      longDateFormat: (format: any) => this.$locale().formats[format],
    }
  }
  proto.localeData = function () {
    return localeData.bind(this)()
  }

  dayjs.localeData = () => {
    const localeObject = getDayjsLocaleObject()
    return {
      firstDayOfWeek: () => localeObject.weekStart || 0,
      weekdays: () => dayjs.weekdays(),
      weekdaysShort: () => dayjs.weekdaysShort(),
      weekdaysMin: () => dayjs.weekdaysMin(),
      months: () => dayjs.months(),
      monthsShort: () => dayjs.monthsShort(),
    }
  }

  dayjs.months = () => getDayjsLocaleObject().months

  dayjs.monthsShort = () => getShort(getDayjsLocaleObject(), 'monthsShort', 'months', 3)

  dayjs.weekdays = () => getDayjsLocaleObject().weekdays

  dayjs.weekdaysShort = () => getShort(getDayjsLocaleObject(), 'weekdaysShort', 'weekdays', 3)

  dayjs.weekdaysMin = () => getShort(getDayjsLocaleObject(), 'weekdaysMin', 'weekdays', 2)
}
