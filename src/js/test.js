console.log('Test');

if (!navigator.onLine) {
  console.log('Estas offline');
}

if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('./sw.js');
}
