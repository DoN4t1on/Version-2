import http from '../http-common';

class userService {
  //   getAll() {
  //     return http.get("/tutorials");
  //   }

  //   get(id) {
  //     return http.get(`/tutorials/${id}`);
  //   }

  signUp(data) {
    return http.post('/register', data);
  }
  login(data) {
    return http.post('/login', data);
  }

  applyForForgetPass(data) {
    return http.post('/applyforgetpass', data);
  }

  updatePass(data) {
    return http.post('/updatepassword', data);
  }

  commonPostService(route, data) {
    return http.post(route, data);
  }
  commonGetService(route, data) {
    return http.get(route, data);
  }
  commonDeleteService(route, data) {
    return http.delete(route, data);
  }

  //   update(id, data) {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id) {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll() {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new userService();
