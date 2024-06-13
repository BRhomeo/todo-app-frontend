export const baseUrl = "https://api-timdecs2ra-uc.a.run.app";

export default {
  auth: {
    login: `${baseUrl}/auth/signin`,
    signup: `${baseUrl}/auth/signup`,
    logout: `${baseUrl}/auth/logout`,
  },
  todos: {
    create: `${baseUrl}/todo`,
    update: (id: string) => `${baseUrl}/todo/${id}`,
    delete: (id: string) => `${baseUrl}/todo/${id}`,
    get: `${baseUrl}/todo`,
  },
};
