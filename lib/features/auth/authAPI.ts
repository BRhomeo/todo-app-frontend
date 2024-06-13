// A mock function to mimic making an async request for data
import apiEndpoints from "@/lib/apiEndpoints";

export const signupRequest = async (signup: SignUp) => {
  const response = await fetch(apiEndpoints.auth.signup, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: signup }),
  });
  const result: {
    token: string;
    refreshToken: string;
    user: User;
  } = await response.json();

  return result;
};

export const loginRequest = async (login: SignIn) => {
  const response = await fetch(apiEndpoints.auth.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: login }),
  });
  const result: {
    token: string;
    refreshToken: string;
    user: User;
  } = await response.json();

  return result;
};
