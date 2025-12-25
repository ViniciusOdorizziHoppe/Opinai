if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker registrado com sucesso'))
    .catch(err => console.error('Erro ao registrar SW:', err));
}
