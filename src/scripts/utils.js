const githubAPICall = async (url) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token 063ae510a3f1522691403734e91107a659daa768',
  });

  const fetchInit = {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'defaul',
  };

  const res = await fetch(url, fetchInit);
  const json = await res.json();
  return json;
};

export default githubAPICall;
