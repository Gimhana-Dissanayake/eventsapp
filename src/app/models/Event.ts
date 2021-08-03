import { Attendee } from "./Attendee";
import { Coodinate } from "./Coodinate";

export interface Event {
  id: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  city: Coodinate;
  venue: Coodinate;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
}
