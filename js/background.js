chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Отслеживание изменения ссылки
  if (changeInfo.url) {
    console.log(changeInfo.url);
    chrome.tabs.sendMessage(tabId, {
      message: 'url-changed',
      url: changeInfo.url,
    });
  }
});

chrome.webNavigation.onCommitted.addListener(details => {
  // Отслеживание обновления страницы
  if (details.transitionType === 'reload') {
    setTimeout(() => {
      chrome.tabs.sendMessage(details.tabId, {
        message: 'page-refreshed',
        url: details.url,
      });
    }, 1500);
  } 
});
