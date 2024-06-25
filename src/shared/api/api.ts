import { BASE_URL } from "../constants/env";
import { UserEvent } from "../types";

export class API {
  private static headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  };

  static saveEvent = async (event: UserEvent) => {
    try {
      const res = await fetch(BASE_URL + "save_event", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(event),
      });
      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  static updateEvent = async (event: UserEvent) => {
    try {
      const res = await fetch(BASE_URL + "event/" + event.id, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(event),
      });
      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };
  static deleteEvent = async (event: UserEvent) => {
    try {
      const res = await fetch(BASE_URL + "event/" + event.id, {
        method: "DELETE",
        headers: this.headers,
      });
      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  static getUserEvents = async (id: string) => {
    try {
      const res = await fetch(BASE_URL + "events/" + id, {
        method: "GET",
        headers: this.headers,
      });
      if (res.ok) {
        const data = await res.json();
        return data.results as UserEvent[];
      }
    } catch (error) {
      console.error(error);
    }
  };
}
