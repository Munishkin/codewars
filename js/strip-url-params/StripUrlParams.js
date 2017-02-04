function stripUrlParams(url, paramsToStrip){

  let [urlPath, urlParams] = url.split('?');
  let paramKVMap = {};
  let urlDistinctParams = ''
  if (urlParams) {
      urlParams.split('&').forEach((e) => {
        let [key, val] = e.split('=');
        if (!paramsToStrip || !paramsToStrip.includes(key)) {
          if (!paramKVMap[key]) {
            paramKVMap[key] = val;
            urlDistinctParams += `${key}=${val}&`;
          }
        }
      });
      if (urlDistinctParams) {
        urlDistinctParams = urlDistinctParams.substring(0, urlDistinctParams.length - 1);
      }
  }
  return urlPath + (urlDistinctParams ? '?' + urlDistinctParams : '');
}