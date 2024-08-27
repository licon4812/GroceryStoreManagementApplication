import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, any>();

  get<T>(key: string): Observable<T> {
    const cachedData = this.cache.get(key);
    if (cachedData) {
      return of(cachedData);
    }
    return new Observable<T>(); // Return an empty observable if no data is cached
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, data);
  }
}