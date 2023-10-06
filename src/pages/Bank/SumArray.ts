export function findSumArray(targetSum: number, step: number) {
  if (targetSum <= 0 || step < 1) {
    return null // Недопустимый ввод
  }

  if (targetSum < step) {
    return null // Невозможно получить массив длины step, сумма которого равна или больше targetSum
  }

  const result = Array(step).fill(1) // Заполняем массив начальными значениями

  for (let i = 0; i < targetSum - step; i++) {
    const randomIndex = Math.floor(Math.random() * step) // Выбираем случайный индекс
    result[randomIndex]++ // Увеличиваем число в случайно выбранной ячейке
  }

  if (result.some((value) => value <= 0)) {
    return null // Если в результате получились нули или отрицательные числа, вернем null
  }

  return result.map((item) => {
    return {
      count: item,
      status: true,
    }
  })
}
