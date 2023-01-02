// import moment, { Moment } from "moment";

export const rules = {
  // дефолтное значение ="Обязательное поле"
  required: (message: string = "Обязательное поле") => ({
    required: true,
    message,
  }),

  // isDateAfter: (message: string) => () => ({
  //   validator(_: any, value: Moment) {
  //     // сравниваем даты: которая пришла к нам с DatePicker с текущей датой.
  //     if (value.isSameOrAfter(moment())) {
  //       return Promise.resolve();
  //     }
  //     return Promise.reject(new Error(message));
  //   },
  // }),
};
