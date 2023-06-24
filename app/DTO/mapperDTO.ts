const AuthResponse = require('./responseDTO');

function mapToJSON(cache) {
  const currentCredential = cache.get('currentCredential');
  return new AuthResponse(
    currentCredential.access_token,
    currentCredential.refresh_token,
    currentCredential.expires_in,
    currentCredential.refresh_expires_in,
    currentCredential.token_type
  ).toJSON();
}

module.exports = {
  mapToJSON: mapToJSON,
};
