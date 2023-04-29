chrome.runtime.onMessage.addListener(({ data }: Message, _sender, _sendResponse) => {
  const select = document.querySelector('select');

  if (!select) {
    console.error({ message: 'No select element found' });
    return undefined;
  }
  const options = [...select.options];

  const matchedOption = options.find((option) =>
    option.innerText.toLocaleLowerCase().includes(data.toLocaleLowerCase())
  );

  select.value = matchedOption?.value || select.value;
});
