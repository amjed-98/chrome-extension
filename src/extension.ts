document.addEventListener('DOMContentLoaded', async () => {
  const { id: tabId } = await getCurrentTab();
  if (!tabId) return console.error('No active tab detected');

  await injectScriptAt(tabId);

  const form = document.querySelector('form')!;
  const searchInput = document.querySelector('input')!;
  searchInput.focus();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchText = searchInput.value.trim();

    if (!searchText) return;

    sendMessage({ tabId, message: { data: searchText } });
  });
});

async function sendMessage({ tabId, message }: { tabId: number; message: Message }) {
  return chrome.tabs.sendMessage(tabId, message);
}

async function injectScriptAt(tabId: number) {
  return chrome.scripting.executeScript({
    target: { tabId },
    files: ['user-dom.js'],
  });
}

function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) =>
    chrome.tabs.query({ active: true }, ([currentTab]) => {
      resolve(currentTab);
    })
  );
}
