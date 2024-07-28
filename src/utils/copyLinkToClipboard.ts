export function copyLinkToClipboard(link: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(link)
      .then(function () {
        console.log('Text successfully copied to clipboard')
      })
      .catch(function (err) {
        console.error('Could not copy text: ', err)
      })
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = link

    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      const msg = successful ? 'successful' : 'unsuccessful'
      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }
}
