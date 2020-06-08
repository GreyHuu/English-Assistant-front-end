const URL_PREFIX = "http://localhost:8888";
const api = {
  Login: URL_PREFIX + '/users/login',
  LoginByPhone: URL_PREFIX + "/users/login-by-phone",
  Logout: URL_PREFIX + '/users/logout',
  GetAllUser: URL_PREFIX + '/users/get-all-users',
  GetCurrentUser: URL_PREFIX + '/users/get-current-user',
  Register: URL_PREFIX + '/users/register',
  ForgePassword: '/auth/forge-password',
  SendSms: URL_PREFIX + '/phone/get-phone-code',
  CompareSms: URL_PREFIX + '/phone/compare-code',
  UserInfo: URL_PREFIX + '/users/get-current-user',
}
const reading = {
  GetAllReadingGroup: URL_PREFIX + "/reading/get-all-groups",
  SearchGroupsByTitle: URL_PREFIX + "/reading/search-title",
  GetCurrentReadings: URL_PREFIX + "/reading/get-contents",
  GetCurrentReadingQuestions: URL_PREFIX + "/reading/get-questions",
  CompareGroupAnswers: URL_PREFIX + "/reading/compare-answers",
  SearchGroup: URL_PREFIX + "/reading/search-title",
  DeleteGroup: URL_PREFIX + "/reading/delete-group",
  InsertHistory: URL_PREFIX + "/reading/insert-history",
}

const writing = {
  GetAllCompositions: URL_PREFIX + "/writing/get-all-compositions",
  AddCompositionAndCount: URL_PREFIX + "/writing/add-a-composition-and-count/{cpt_reference}",
  getAllMyCompositions: URL_PREFIX + "/writing/get-all-my-compositions",
  deleteMyCompositionById:"/writing/delete-my-composition"
}
export {
  api,
  reading,
  writing
}
