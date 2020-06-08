const URL_PREFIX = "http://localhost:8888";
const api = {
  Login: URL_PREFIX + '/users/login',
  LoginByPhone: URL_PREFIX + "/users/login-by-phone",
  Logout: URL_PREFIX + '/users/logout',
  ForgePassword: '/auth/forge-password',
  Register: URL_PREFIX + '/users/register',
  SendSms: URL_PREFIX + '/phone/get-phone-code',
  CompareSms: URL_PREFIX + '/phone/compare-code',
  UserInfo: URL_PREFIX + '/users/get-current-user',
  GetAllUser: URL_PREFIX + '/users/get-all-users',
  GetAllNews: URL_PREFIX + '/news/get-all-news',
  GetAllComments: URL_PREFIX + '/comments/get-all-comments',
  GetTheComments: URL_PREFIX + '/comments/get-the-comments',
  DeleteTheComments: URL_PREFIX + '/comments/delete-the-comments',
  InsertTheComments: URL_PREFIX + '/comments/insert-the-comments',
}
export default api
