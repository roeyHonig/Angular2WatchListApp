import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpBackend } from '@angular/common/http/src/backend';

export class MockXHRBackend implements HttpBackend {
  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') medium = '';
            }
            let mediaItems;
            if (medium) {
              mediaItems = this._mediaItems.filter(mediaItem => mediaItem.medium === medium);
            } else {
              mediaItems = this._mediaItems;
            }
            responseOptions = {
              body: {results: JSON.parse(JSON.stringify(mediaItems))},
              status: 200
            };
          } 
          break;
        case 'POST':
          let mediaItem = request.body;
          mediaItem.id = this._getNewId();
          this._mediaItems.push(mediaItem);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          let id = parseInt(request.url.split('/')[1]);
          this._deleteMediaItem(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deleteMediaItem(id) {
    const mediaItem = this._mediaItems.find(mediaItem => mediaItem.id === id);
    const index = this._mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this._mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._mediaItems.length > 0) {
      return Math.max.apply(Math, this._mediaItems.map(mediaItem => mediaItem.id)) + 1;
    } else {
      return 1;
    }
  }

  _mediaItems = [
    {
      id: 1,
      original_title: "Firebug2",
      medium: "Series",
      category: "Science Fiction",
      genre_ids: [53],
      release_date: "1999-10-15",
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      original_title: "The Small Tall",
      medium: "Movies",
      category: "Comedy",
      genre_ids: [18],
      release_date: "2017-02-16",
      watchedOn: null,
      isFavorite: true
    }, {
      id: 3,
      original_title: "The Redemption",
      medium: "Movies",
      category: "Action",
      genre_ids: [18],
      release_date: "2020-09-10",
      watchedOn: null,
      isFavorite: false
    }, {
      id: 4,
      original_title: "Hoopers",
      medium: "Series",
      category: "Drama",
      genre_ids: [18],
      release_date: "2021-11-24",
      watchedOn: null,
      isFavorite: true
    }, {
      id: 5,
      original_name: "Happy Joe: Cheery Road",
      medium: "Movies",
      category: "Action",
      genre_ids: [18],
      release_date: "2020-11-13",
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];
}
