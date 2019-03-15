import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/providers/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .separa{
     margin-top: 10px;
    }
    .ancho {
      width: 100%;
    }
    .tarjetas {
      padding: 5px;
      margin-top: 5px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  videos: any[];
  video: any;

  constructor( private _yS: YoutubeService ) {

    this._yS.getVideos()
      .subscribe( data => {
        this.videos = data;
      } );

  }

  ngOnInit() {
  }

  verVideo( video: any ) {
    this.video = video;

    $('#myModal').modal();

  }

  closeModal() {
    this.video = null;
    $('#myModal').modal('hide');
  }

  loadMore() {
    this._yS.getVideos()
      .subscribe( data => {
        this.videos.push.apply( this.videos, data);
      } );
  }

}
