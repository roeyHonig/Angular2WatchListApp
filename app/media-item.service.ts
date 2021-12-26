import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, } from 'rxjs/operators';

@Injectable()
export class MediaItemService {
  constructor(private http: HttpClient) {}

  get(medium) {
    let getOptions = {
      /*params: { medium }*/
      params: {
        api_key: '7d86a696ac456a2d1cf6691522cd3a46',
        query: 'dune'
      }
    };
    return this.http.get<MediaItemsResponse>('https://api.themoviedb.org/3/search/movie', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => {
          let arrayOfMediaItems = [];
          response.results.forEach(element => {
            let theCatagory = "Undefined";
            this.mediaItemsMovieGenres.forEach(gen => {
              if (gen.id == element.genre_ids[0]) {
                theCatagory = gen.name;
              }
            });
            element.mediaItem = {
              id: 2,
              original_title: "mock",
              original_name: null,
              medium: "mock",
              category: "mock",
              release_date: "1901-02-16",
              watchedOn: null,
              isFavorite: true
            }
            element.mediaItem.id = element.id;
            element.mediaItem.original_name = element.original_name;
            element.mediaItem.original_title = element.original_title;
            element.mediaItem.release_date = element.release_date;
            element.mediaItem.watchedOn = element.watchedOn;
            element.mediaItem.isFavorite = element.isFavorite;
            element.mediaItem.category = theCatagory;
            arrayOfMediaItems.push(element.mediaItem)
          });
          return arrayOfMediaItems;
        })
      );
  }

  mediaItemsMovieGenres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
  
}




interface MediaItemsResponse {
  results: MediaItemRaw[]
}

interface MediaItem {
  id: number;
  original_title: string; 
  original_name: string; 
  medium: string;
  category: string;
  release_date: string;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemRaw {
  id: number;
  original_title: string; 
  original_name: string; 
  medium: string;
  genre_ids: [number];
  release_date: string;
  watchedOn: number;
  isFavorite: boolean;
  mediaItem: MediaItem;
}