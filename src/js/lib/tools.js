const addScript = src => {
  const el = document.createElement('script');
  el.src = src;
  document.head.appendChild(el);
  el.onload = () => el.remove();
};

const formatParams = params => {
  return `?${Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')}`;
};

const getJsonFromUrl = url => {
  if (!url) url = location.href;
  const query = url.substr(1);
  const result = {};

  query.split('&').forEach(part => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
};

const selectOnClick = el => {
  el.addEventListener('click', () => {
    el.focus();
    el.select();
  });
};

export {
  addScript,
  formatParams,
  getJsonFromUrl,
  selectOnClick
};
