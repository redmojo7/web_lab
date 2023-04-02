const Auth = {
  checkLogin: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      //window.location.href = '/';
    }
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}

export default Auth;

