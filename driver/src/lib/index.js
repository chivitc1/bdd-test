
const logHttpRequest = (req, res, next) => {
  console.log("------------------------------")
  console.log(`${new Date().toISOString()}, ${req.method} : ${req.url}`);
  if (req.method == 'POST' || req.method == 'PUT' || req.method == 'PATCH')
    console.log(prettyJson(req.body));
  console.log("------------------------------")
  next();
}

const handleNoRoute = (req, res) => {
  res.type('text/plain')
    .status(404)
    .send('404 - We do not serve this');
}

const prettyJson = (json) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "\x1b[36m";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "\x1b[34m";
        } else {
          cls = "\x1b[32m";
        }
      } else if (/true|false/.test(match)) {
        cls = "\x1b[35m";
      } else if (/null/.test(match)) {
        cls = "\x1b[31m";
      }
      return cls + match + "\x1b[0m";
    }
  );
}

export { logHttpRequest, handleNoRoute };
