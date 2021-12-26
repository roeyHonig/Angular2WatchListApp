import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaItemService {
  constructor(private http: HttpClient) {}

  get(medium) {
    let getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemsResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => {
          return response.mediaItems;
        })
      );
  }
  
}

interface MediaItemsResponse {
  mediaItems: MediaItem[]
}

interface MediaItem {
  id: number;
  original_title: string;
  medium: string;
  category: string;
  release_date: string;
  watchedOn: number;
  isFavorite: boolean;
}