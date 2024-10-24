const create = () => {
  const login = () => {};
  const register = () => {};

  return { login, register };
};

export const WebApi = { create };

export type WebApi = ReturnType<typeof create>;

// Необходимо инжектировать нашу зависимость WebApi в приложение с помощь React.Context