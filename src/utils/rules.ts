export const rules = {
  // дефолтное значение ="Обяательное поле"
  required: (message: string = "Обяательное поле") => ({
    required: true,
    message,
  }),
};
