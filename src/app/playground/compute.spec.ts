import {compute} from './compute'
// angular видит название файла .spec и понимает что он для тестов
describe('compute', () => {

  it('should return 0 if negative input', () => {
    const result = compute(-1)
    expect(result).toBe(0)
  })

  it('should increment input if positive', () => {
    const result = compute(1)
    expect(result).toBe(2)
  })

})
