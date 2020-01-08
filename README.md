# google-calendar-react

Integration of Google Calendar API on your Custom Client side OR React component

## Install

Using NPM

```
npm install --save google-calendar-react
```

Using Yarn

```
yarn add google-calendar-react
```

## Use

```
import GoogleAPICalendar from 'google-calendar-react';
```

### Typescript Import

```
import GoogleAPICalendar from 'google-calendar-react/GoogleAPICalendar';
```

Go to the https://console.developers.google.com/flows/enableapi?apiid=calendar.
find your ApiKey and clientId
And

Create a file googleApiConfig.json in the root directory with your googleApi clientId and ApiKey.

```json
{
  "clientId": "<YOUR_GOOGLE_CLIENT_ID>",
  "apiKey": "<YOUR_GOOGLE_API_KEY>",
  "scope": "https://www.googleapis.com/auth/calendar", // Pass your Required Read Write Scopes as per needs.
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
}
```

## Setup

### handleAuthClick:

```javascript
    /**
     * Sign in with a Google account.
     */
    public handleAuthClick(): void
```

### handleSignOutClick:

```javascript
    /**
     * Sign out user google account
     */
    public handleSignoutClick(): void
```

#### Example

```javascript
  import React, {ReactNode, SyntheticEvent} from 'react';
  import GoogleAPICalendar from 'google-calendar-react';

  export default class DoubleButton extends React.Component {
      constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
      }

      public handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
          GoogleAPICalendar.handleAuthClick();
        } else if (name === 'sign-out') {
          GoogleAPICalendar.handleSignoutClick();
        }
      }

      render(): ReactNode {
        return (
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-in')}
              >
                sign-in
              </button>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button>
          );
      }
  }
```

### setCalendar:

```javascript
    /**
     * Set the default attribute calendar
     * @param {string} newCalendar ID.
     */
    public setCalendar(newCalendar: string): void
```

## Manage Event

You need to be registered with handleAuthClick.

### Create Event:

```javascript
    /**
    * Create calendar event
    * @param {string} CalendarId for the event by default use 'primary'.
    * @param {object} Event with start and end dateTime
    * @returns {any} Promise on the event.
    */
   public createEvent(event: object, calendarId: string = this.calendar): any {
```

### Create Event From Now:

```javascript
     /**
     * Create an event from the current time for a certain period.
     * @param {number} Time in minutes for the event
     * @param {string} Summary(Title) of the event
     * @param {string} Description of the event (optional)
     * @param {string} CalendarId by default calendar set by setCalendar.
     * @returns {any} Promise on the event.
     */
    public createEventFromNow({time, summary, description = ''}: any, calendarId: string = this.calendar): any
```

#### Example

```javascript
import GoogleAPICalendar from "google-calendar-react";

const eventFromNow: object = {
  summary: "Poc Dev From Now",
  time: 480
};

GoogleAPICalendar.createEventFromNow(eventFromNow)
  .then((result: object) => {
    console.log(result);
  })
  .catch((error: any) => {
    console.log(error);
  });
```

### List All Upcoming Events:

```javascript
    /**
     * List all events in the calendar
     * @param {number} maxResults to see
     * @param {string} calendarId to see by default use the calendar attribute
     * @returns {any} Promise with the result.
     */
    public listUpcomingEvents(maxResults: number, calendarId: string = this.calendar): any
```

#### Example

```javascript
import GoogleAPICalendar from "google-calendar-react";

if (GoogleAPICalendar.sign)
  GoogleAPICalendar.listUpcomingEvents(10).then(({ result }: any) => {
    console.log(result.items);
  });
```

## Utils

### listenSign:

```javascript
     /**
     * Execute the callback function when a user is disconnected or connected with the sign status.
     * @param callback
     */
    public listenSign(callback: any): void
```

### onLoad:

```javascript
    /**
     * Execute the callback function when gapi is loaded (gapi needs to be loaded to use any other methods)
     * @param callback
     */
    public onLoad(callback: any): void
```

#### Example

```javascript
    import React, {ReactNode} from 'react';
    import GoogleAPICalendar from 'google-calendar-react';

    export default class StatusSign extends React.Component<any, any> {
        constructor(props) {
            super(props);
            this.state = {
              sign: GoogleAPICalendar.sign,
            };
            this.signUpdate = this.signUpdate.bind(this);
            GoogleAPICalendar.onLoad(() => {
                GoogleAPICalendar.listenSign(this.signUpdate);
            });
        }

        public signUpdate(sign: boolean): any {
            this.setState({
                sign
            })
        }

        render(): ReactNode {
            return (
                <div>{this.state.sign}</div>
            );
        }
    }
```
