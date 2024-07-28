export function verifyNewListName(value: string, listNames: string[]) {
  if (value === '') {
    return { isValid: false, message: 'Please, write a list name' }
  } else if (listNames.includes(value)) {
    return { isValid: false, message: 'This list already exists' }
  } else {
    return { isValid: true, message: '' }
  }
}
