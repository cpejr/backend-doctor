import cache from 'memory-cache'
import jwt_decode from 'jwt-decode'
import { initializeAccessToken, renewAccessToken } from './auth'

export default function monitor(): void {
  if (cache.get('currentCredential') == null) {
    initializeAccessTokenReference()
  } else {
    monitorTimeInterval()
  }
}

function extractCredentialAttributes(response: any): Map<string, any> {
  const map = new Map<string, any>()
  map.set('access_token', response.data['access_token'])
  map.set('refresh_token', response.data['refresh_token'])
  map.set('expires_in', response.data['expires_in'])
  map.set('refresh_expires_in', response.data['refresh_expires_in'])
  map.set('token_type', response.data['token_type'])
  cache.put('currentCredential', map)
  return map
}

function initializeAccessTokenReference(): void {
  console.log('Request of new credential.')

  const promisePost = initializeAccessToken()
  promisePost
    .then(function (response: any) {
      const map = extractCredentialAttributes(response)
      //console.log('Created credential: ' + map.get('access_token'))
    })
    .catch(function (error: any) {
      console.log('Detected an error during the process of requesting access token: ' + error)
    })
}

function monitorTimeInterval(): void {
  console.log('Starting monitoring...')
  const map: Map<string, any> = cache.get('currentCredential')

  const accessToken: string = map.get('access_token')
  const jwtDecoded: any = jwt_decode(accessToken, {})

  const expTime: number = jwtDecoded.exp
  const currentTime: number = Math.floor(+new Date() / 1000)
  // The IDP_TASK_UPDATE_INTERVAL_IN_MINUTES is multiplied by 60 (number of seconds in a minute) because the expiration time is a calculation
  // between minutes x seconds.
  const nextMonitoringPeriod: number = +1 * 60

  if (expTime <= currentTime + nextMonitoringPeriod) {
    const promisePost = renewAccessToken(map.get('refresh_token'))
    promisePost
      .then(function (response: any) {
        const map = extractCredentialAttributes(response)
        console.log('Refreshed credentials: ' + map.get('access_token'))
      })
      .catch(function (error: any) {
        console.log('Detected an error during the process of refreshing access token: ' + error)
      })
  } else {
    console.log(
      'Update skipped. Access token remaining time until expiration: ' +
        ((expTime - currentTime) / 60).toFixed(0) +
        ' minutes'
    )
  }
}