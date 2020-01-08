declare var test: any;

import GoogleAPICalendar from "./build/GoogleAPICalendar";

test("setCalendar method", () => {
  GoogleAPICalendar.setCalendar("test-calendar");
  expect(GoogleAPICalendar.calendar).toBe("test-calendar");
});
