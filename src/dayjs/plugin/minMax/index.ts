/* tslint:disable */

export default (o: any, c: any, d: any) => {
  const sortBy = (method: any, dates: any) => {
    if (!dates.length) {
      return d()
    }
    if (dates.length === 1 && dates[0].length > 0) {
      ;[dates] = dates
    }
    let result
    ;[result] = dates
    for (let i = 1; i < dates.length; i += 1) {
      if (!dates[i].isValid() || dates[i][method](result)) {
        result = dates[i]
      }
    }
    return result
  }

  d.max = function () {
    const args = [].slice.call(arguments, 0) // eslint-disable-line prefer-rest-params
    return sortBy('isAfter', args)
  }
  d.min = function () {
    const args = [].slice.call(arguments, 0) // eslint-disable-line prefer-rest-params
    return sortBy('isBefore', args)
  }
}
