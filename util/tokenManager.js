let globalToken = null;

function setToken(token) {
  globalToken = token;
}

function getToken() {
  return globalToken;
}

function clearToken() {
  globalToken = null;
}

function isValidToken(token) {
  return token === globalToken;
}

module.exports = { setToken, getToken, isValidToken, clearToken };
