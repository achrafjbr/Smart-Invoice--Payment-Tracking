import {
  login as loginService,
  register as registerService,
} from "../services/authenticationService.js";

const register = async (request, response) => {
  console.log(request);
  const {
    body: { name, email, password, passwordConfirmation, role },
  } = request;
  try {
    const result = await registerService(
      name,
      email,
      password,
      passwordConfirmation,
      role,
    );
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const login = async (request, response) => {
  const {
    body: { email, password },
  } = request;
  try {
    const result = await loginService(email, password);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

export { register, login };
