const delay = ms => new Promise(res => setTimeout(res, ms));

document.getElementById('downloadBtn').addEventListener('click', async() => {
  const text = document.getElementById('links').value;
  const urls = text.split('\n').map(url => url.trim()).filter(url => url.length > 0);

  if (urls.length === 0) {
    alert('Пожалуйста, введите ссылки!');
    return;
  }

  alert(`В папку "Загрузки" будет загружено файлов: ${urls.length}`);

  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];

    const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    const extension = extensionMatch ? extensionMatch[1] : document.getElementById('extInput').value.trim();
    const filenumber = String(index + 1).padStart(3, '0');
    
    const newFileName = `image_${filenumber}.${extension}`;

    // Запускаем скачивание

    chrome.downloads.download({
      url: url,
      filename: `${newFileName}`, // Файлы попадут в папку "Загрузки"
      conflictAction: 'uniquify'
    }, (id) => {
      if (chrome.runtime.lastError) {
        console.error(`Ошибка (${url}):`, chrome.runtime.lastError.message);
      }
    });

    if (index < urls.length - 1) {
      await delay(500);
    }
    
  };

});