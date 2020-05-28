const URL_PREFIX = "http://localhost:8888";
const api = {
  Login: URL_PREFIX + '/users/login',
  Logout: URL_PREFIX + '/users/logout',
  ForgePassword: '/auth/forge-password',
  Register: URL_PREFIX + '/users/register',
  SendSms: URL_PREFIX + '/users/get-phone-code',
  CompareSms: URL_PREFIX + '/users/compare-code',
  UserInfo: URL_PREFIX + '/users/get-current-user',
  GetAllUser: URL_PREFIX + '/users/get-all-users'
}
export default api
