test('empty', () => {})

// test('locale support', () => {
//   // Before locale is loaded
//   expect(dayjs('2018-05-05').locale('sv').format('MMMM D, YYYY')).toBe('May 5, 2018')
//
//   loadDayjsLocales(['sv'])
//
//   // After locale is loaded
//   expect(dayjs('2018-05-05').locale('sv').format('MMMM D, YYYY')).toBe('maj 5, 2018')
//
//   // Needs 'localizedFormat' plugin
//   expect(dayjs('2018-05-05').locale('sv').format('LL')).toBe('5 maj 2018')
//
//   // const s = dayjs('2018-05-05').locale('sv').format('LL')
//   // console.log(s)
// })

export {}
