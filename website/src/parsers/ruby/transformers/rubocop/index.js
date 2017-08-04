const ID = 'rubocop-server';
const name = 'Rubocop';
//import jquery as $ from 'jquery';

export default {
  id: ID,
  displayName: name,
  version: '0.0.1',
  homepage: 'www.google.com',

  defaultParserID: 'mugwort',

  loadTransformer(callback) {
    callback({ yo: 'Yo', nonJavascript: true });
    //    require(
    //      ['eslint1', '../../utils/eslintUtils'],
    //      (eslint, utils) => callback({...eslint, utils})
    //    );
  },

  transform({ obj }, transformCode, code) {
    var form = new FormData();
    form.append('rule', transformCode);
    form.append('code', code);

    const headers = new Headers();
    headers.append('Access-Control-Request-Headers', 'x-requested-with');

    const options = {
      headers: headers,
      method: 'POST',
      mode: 'cors',
      body: form,
    };
    return fetch('http://localhost:4567/rubocop-parse', options)
      .then(response => {
        return response.json();
      })
      .then(response => {
        return response;
      });
  },
};
