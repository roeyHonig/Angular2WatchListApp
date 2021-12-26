import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, } from 'rxjs/operators';
import {EventEmitter} from '@angular/core';

@Injectable()
export class MediaItemService {
  mediaItemsChange: EventEmitter<MediaItem[]> = new EventEmitter();
  constructor(private http: HttpClient) {}

  get(medium) {
    let getOptions = {
      params: {
        api_key: '7d86a696ac456a2d1cf6691522cd3a46',
        query: 'spider'
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
              isFavorite: true,
              poster_path: null,
              rating: "Avergae rating"
            }
            element.mediaItem.id = element.id;
            element.mediaItem.original_name = element.original_name;
            element.mediaItem.original_title = element.original_title;
            element.mediaItem.release_date = element.release_date;
            element.mediaItem.watchedOn = element.watchedOn;
            element.mediaItem.isFavorite = element.isFavorite;
            element.mediaItem.poster_path = 'https://image.tmdb.org/t/p/original' + element.poster_path;
            if (element.vote_average > 7) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😀'; 
            } else if (element.vote_average > 4) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😐'; 
            } else {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '🙁'; 
            }
            element.mediaItem.category = theCatagory;
            arrayOfMediaItems.push(element.mediaItem)
          });
          return arrayOfMediaItems;
        })
      );
  }

  getMovies(name: string, catagoryId: number, year: number) {
    console.log(name);
    let getOptions = {
      params: {
        api_key: '7d86a696ac456a2d1cf6691522cd3a46',
        query: name,
        year: year ? '' + year : null
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
              isFavorite: true,
              poster_path: null,
              rating: "Avergae rating"
            }
            element.mediaItem.id = element.id;
            element.mediaItem.original_name = element.original_name;
            element.mediaItem.original_title = element.original_title;
            element.mediaItem.release_date = element.release_date;
            element.mediaItem.watchedOn = element.watchedOn;
            element.mediaItem.isFavorite = element.isFavorite;
            element.mediaItem.poster_path = 'https://image.tmdb.org/t/p/original' + element.poster_path;
            if (element.vote_average > 7) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😀'; 
            } else if (element.vote_average > 4) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😐'; 
            } else {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '🙁'; 
            }
            element.mediaItem.category = theCatagory;
            if (element.genre_ids[0] == catagoryId || catagoryId == null) {
              arrayOfMediaItems.push(element.mediaItem)
            }
          });
          return arrayOfMediaItems;
        })
      );
  }

  
  getSeries(name: string, catagoryId: number, year: number) {
    console.log(name);
    let getOptions = {
      params: {
        api_key: '7d86a696ac456a2d1cf6691522cd3a46',
        query: name,
        first_air_date_year: year ? '' + year : null
      }
    };
    return this.http.get<MediaItemsResponse>('https://api.themoviedb.org/3/search/tv', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => {
          let arrayOfMediaItems = [];
          response.results.forEach(element => {
            let theCatagory = "Undefined";
            this.mediaItemsTvGenres.forEach(gen => {
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
              isFavorite: true,
              poster_path: null,
              rating: "Avergae rating"
            }
            element.mediaItem.id = element.id;
            element.mediaItem.original_name = element.original_name;
            element.mediaItem.original_title = element.original_title;
            element.mediaItem.release_date = element.release_date;
            element.mediaItem.watchedOn = element.watchedOn;
            element.mediaItem.isFavorite = element.isFavorite;
            element.mediaItem.poster_path = 'https://image.tmdb.org/t/p/original' + element.poster_path;
            if (element.vote_average > 7) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😀'; 
            } else if (element.vote_average > 4) {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '😐'; 
            } else {
              element.mediaItem.rating = 'Viewers Rating: ' + element.vote_average + ' ' + '🙁'; 
            }
            element.mediaItem.category = theCatagory;
            if (element.genre_ids[0] == catagoryId || catagoryId == null) {
              arrayOfMediaItems.push(element.mediaItem)
            }
          });
          return arrayOfMediaItems;
        })
      );
  }

  onMediaChange(mediaItems: MediaItem[]) {
    this.mediaItemsChange.next(mediaItems);
  }

  search(mediaItem) {
    if (mediaItem.medium == "Movies") {
      const genreId = this.getMovieGenreIdBasedOnCatagory(mediaItem.category);
      return this.getMovies(mediaItem.name, genreId, mediaItem.year);
    } else if (mediaItem.medium == "Series") {
      const genreId = this.getTvGenreIdBasedOnCatagory(mediaItem.category);
      return this.getSeries(mediaItem.name, genreId, mediaItem.year);
    }
  }

  getMediaChangeEmitter() {
    return this.mediaItemsChange;
  }

  getMovieGenreIdBasedOnCatagory(catagory: string) {
    let idToReturn = null;
    this.mediaItemsMovieGenres.forEach(element => {
      if (element.name == catagory) {
        idToReturn = element.id;
      }
    });
    return idToReturn;
  }
  getTvGenreIdBasedOnCatagory(catagory: string) {
    let idToReturn = null;
    this.mediaItemsTvGenres.forEach(element => {
      if (element.name == catagory) {
        idToReturn = element.id;
      }
    });
    return idToReturn;
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

  
  mediaItemsTvGenres = [
    {
      "id": 10759,
      "name": "Action & Adventure"
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
      "id": 10762,
      "name": "Kids"
  },
  {
      "id": 9648,
      "name": "Mystery"
  },
  {
      "id": 10763,
      "name": "News"
  },
  {
      "id": 10764,
      "name": "Reality"
  },
  {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
  },
  {
      "id": 10766,
      "name": "Soap"
  },
  {
      "id": 10767,
      "name": "Talk"
  },
  {
      "id": 10768,
      "name": "War & Politics"
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
  rating: string;
  poster_path: string
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
  poster_path: string;
  vote_average: number;
  mediaItem: MediaItem;
}