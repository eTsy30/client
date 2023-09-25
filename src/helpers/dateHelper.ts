export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  return date.toLocaleDateString('us-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
