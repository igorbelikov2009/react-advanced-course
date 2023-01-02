import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { SetGuestsAction, SetEventsAction, EventActionEnum } from "./types";

export const EventActionCreators = {
  setGuests: (payload: IUser[]): SetGuestsAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
  setEvents: (payload: IEvent[]): SetEventsAction => ({ type: EventActionEnum.SET_EVENTS, payload }),

  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(response.data));
    } catch (error) {
      console.log(error);
    }
  },
  // С помощью этого креатера мы будем добавлять вновь созданный евент
  // в глобальное хранилище localStorage.
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      // Поскольку евенты будем хранить в localStorage, во-первых, мы их оттуда получим.
      // Если нам ничего оттуда не вернулось, то будем возвращать пустой массив.
      const events = localStorage.getItem("events") || "[]";
      // Посольку в localStorage храним данные в виде строки, необходимо их преобразовать
      // в JS- объект. Создадим массив json, хранящий объекты-события в localStorage.
      // Ещё раз: если там ничего нет, то этот массив json пустой [].
      const json = JSON.parse(events) as IEvent[];
      // Теперь в этот массив добавляем новый созданный event.
      json.push(event);
      // После чего, этот массив нам необходимо поместить в состояние,
      // чтобы мы увидели обновление интерфейса и увидели новое созданное событие.
      dispatch(EventActionCreators.setEvents(json));
      // После чего, массив с новым элементом нам необходимо опять поместь в localStorage.
      // Что бы после обновления страницы, у нас вся информация не пропала.
      // Перед этим, нам необходимо запарсить его к строке
      localStorage.setItem("events", JSON.stringify(json));
    } catch (error) {
      console.log(error);
    }
  },

  // Для получения событий напишем новый экшен. username - имя пользователя, который
  // авторизованн в текущий момент. Его мы достаём внутри экшен-креатора из состояния.
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      // Данные для конкретного пользователя, либо он является гостем, либо он является автором того
      // или иного события. Поэтому весь массив мы фильтруем, делаем две проверки, проверяем: является
      // ли пользователь автором либо гостем этого события. И оставляем только те события в массиве,
      // которые удовлетворяют этому условию. Сравниваем гостя и автора с текущим пользователем
      const currentUserEvents = json.filter((ev) => ev.author === username || ev.guest === username);
      // В dispatch передаём уже отфильтрованный массив
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (error) {
      console.log(error);
    }
  },
};
