import './ui.css'

document.getElementById('create').onclick = () => {
  const textbox = document.getElementById('coolors-url') as HTMLInputElement
  const url = textbox.value
  parent.postMessage({ pluginMessage: { type: 'coolors-url', url } }, '*')
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
