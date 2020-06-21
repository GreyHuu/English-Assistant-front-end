const URL_PREFIX = "http://106.15.237.74:8888";
// const URL_PREFIX = "http://localhost:8888";
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
  UpdateUser: URL_PREFIX + '/users/update-user',
  GetAllNews: URL_PREFIX + '/news/get-all-news',
  GetAllComments: URL_PREFIX + '/comments/get-all-comments',
  GetTheComments: URL_PREFIX + '/comments/get-the-comments',
  DeleteTheComments: URL_PREFIX + '/comments/delete-the-comments',
  InsertTheComments: URL_PREFIX + '/comments/insert-the-comments',
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
  GetAllReadingList: URL_PREFIX + "/reading/get-all-reading-list",
  GetAllReadingListData: URL_PREFIX + "/reading/get-reading-list-data",
  SearchReadingListData: URL_PREFIX + "/reading/search-list",
  DeleteReadingList: URL_PREFIX + "/reading/delete-list",
}


const writing = {
  getAllCompositions: URL_PREFIX + "/writing/get-all-compositions",
  addCompositionAndCount: URL_PREFIX + "/writing/add-a-composition-and-count",
  getAllMyCompositions: URL_PREFIX + "/writing/get-all-my-compositions",
  deleteMyCompositionById: URL_PREFIX + "/writing/delete-my-composition",
  getAnExistingComposition: URL_PREFIX + "/writing/get-my-composition",
  updateMyComposition: URL_PREFIX + "/writing/update-my-composition",
  getCompositionQuestionByKeyword: URL_PREFIX + "/writing/get-composition-question-keyword",
}

export {
  api,
  reading,
  writing
}
