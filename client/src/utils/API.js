import axios from "axios";
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  getChildren: () => {
    return axios.get("/api/child");
  },
  //get a child by id, populated with sessions /api/child/:id
  getOneChild: (id) => {
    return axios.get(`/api/child/${id}`);
  },
  //get a session by id /api/session/:id
  getOneSession: (id) => {
    return axios.get(`/api/session/${id}`);
  },
  getChildSessions: id => {
    return axios.get(`/api/child/${id}/sessions`);
  },
  //post a new child /api/user/:id
  postNewChild: (userId, newChild) => {
    return axios.post(`/api/user/${userId}/children`, newChild);
  },
  //post a new session /api/child/:id/sessions
  postNewSession: (childId, newSession) => {
    return axios.post(`/api/child/${childId}/sessions`, newSession);
  },
  signUpUser: (name, email, password, address, phoneNumber) => {
    return axios.post("/auth/api/signup", {name: name, email: email, password: password, address: address, phoneNumber: phoneNumber});
  },
  postNewNote: (sessionId, newNote) => {
    return axios.post(`/api/session/${sessionId}/note`, newNote);
  },
  getOneNote: noteId => {
    return axios.get(`/api/note/${noteId}`);
  },
  postEvent: (userId, event) => {
    return axios.post(`api/user/${userId}/event`, event);
  },
  getEvent: eventId => {
    return axios.get(`api/event/${eventId}`);
  }
};
