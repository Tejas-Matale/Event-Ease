import { Injectable } from '@angular/core';
import { Event } from '../shared/Models/Event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EVENT_BY_ID_URL, EVENT_BY_SEARCH_URL, EVENT_BY_TAGS_URL, EVENT_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(EVENT_URL);
  }

  getAllEventsBySearchTerm(searchTerm: string): Observable<Event[]> {
    return this.http.get<Event[]>(EVENT_BY_SEARCH_URL + searchTerm);
  }

  getEventById(_id: string): Observable<Event> {
    return this.http.get<Event>(`${EVENT_BY_ID_URL}${_id}`);
  }

  getAllEventsByTag(tag: string): Observable<Event[]> {
    return tag === "All" ? this.getAll() : this.http.get<Event[]>(EVENT_BY_TAGS_URL + tag);
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(EVENT_URL, event);
  }

  updateEvent(eventId: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${EVENT_URL}/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${EVENT_URL}/${eventId}`);
  }
}
