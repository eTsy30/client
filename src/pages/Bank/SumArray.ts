export function findSumArray(targetSum: number, step: number) {
  if (targetSum <= 0 || step < 1) {
    return null
  }

  if (targetSum < step) {
    return null
  }

  const result = Array(step).fill(1)

  for (let i = 0; i < targetSum - step; i++) {
    const randomIndex = Math.floor(Math.random() * step)
    result[randomIndex]++
  }

  if (result.some((value) => value <= 0)) {
    return null
  }

  return result.map((item) => {
    return {
      count: item,
      status: true,
    }
  })
}
