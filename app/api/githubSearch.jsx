var axios = require('axios');

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

module.exports = {
  getRepos: function (queryString = "python", sort = "", order = "") {
  // getRepos: function (queryString) {
    var encodedQueryString = encodeURIComponent(queryString);
    var encodedSort = encodeURIComponent(sort);
    var encodedOrder = encodeURIComponent(order);
    var requestUrl = `${GITHUB_SEARCH_URL}?q=${encodedQueryString}&sort=${encodedSort}&order=${encodedOrder}`;
    // var requestUrl = `${GITHUB_SEARCH_URL}?q=${encodedQueryString}`
    console.log('requesturl is ', requestUrl);

    return axios.get(requestUrl).then(function (res) {
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data.items;
      }
    }, function (err) {
      throw new Error('Unable to find matching repo.');
    });
  }
}
