const auth = {
  login(data) {
    localStorage.name =
      data.data.user.first_name + " " + data.data.user.last_name;
    localStorage.email = data.data.user.email;
    localStorage.gender = data.data.user.gender;
    localStorage.role = data.data.user.role;
    localStorage._id = data.data.user.id;
    localStorage.avatar = data.data.user.avatar;
    localStorage.accessToken = data.data.access_token;
    localStorage.refreshToken = data.data.refresh_token;
  },

  setAccessToken(token) {
    localStorage.accessToken = token;
  },

  getAccessToken() {
    return localStorage.accessToken;
  },

  getRefreshToken() {
    return localStorage.refreshToken;
  },

  getID() {
    return localStorage._id;
  },

  getPhone() {
    return localStorage.phone;
  },

  role() {
    return localStorage.role;
  },

  getInfo() {
    return {
      name: localStorage.name || "",
      gender: localStorage.gender || "",
      email: localStorage.email || "",
    };
  },

  getAvatar() {
    return !localStorage.avatar ||
      localStorage.avatar === "undefined" ||
      localStorage.avatar === "null"
      ? ""
      : localStorage.avatar;
  },

  updateAvatar(avt) {
    localStorage.avatar = avt;
  },

  updateInfo(userInfo) {
    localStorage.name = userInfo.name;
    localStorage.gender = userInfo.gender;
    localStorage.dob = userInfo.dob;
    localStorage.email = userInfo.email;
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;