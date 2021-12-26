import { Component } from '@angular/core';

import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: 'app/media-item-list.component.html',
  styleUrls: ['app/media-item-list.component.css']
})
export class MediaItemListComponent {
  medium = '';
  mediaItems = [];

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.mediaItemService.getMediaChangeEmitter().subscribe(mediaItems => {
      this.mediaItems = mediaItems;
    });
  }

}
