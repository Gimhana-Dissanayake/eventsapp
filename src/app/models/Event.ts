import { Attendee } from "./Attendee";

export interface Event {
  id: string;
  title: string;
  date: Date;
  category: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  hostUid: string;
  attendees: Attendee[];
  isCancelled?: boolean;
}
