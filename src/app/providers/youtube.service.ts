import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyA-RIurCmA8krAf1KXnglJYXXg06yCEV9A';
  private playlist = 'UUu-qQNeaTJpbWB-NayPsABg';

  private nextPageToken = '';
  

  constructor( public http: HttpClient ) { }


  getVideos() {

    const url = `${ this.youtubeUrl }/playlistItems`;
    let params = new HttpParams()
      .set( 'part', 'snippet' )
      .set( 'maxResults', '10' )
      .set( 'playlistId', this.playlist )
      .set( 'key', this.apikey );

      if (this.nextPageToken) {
        params = params.set( 'pageToken', this.nextPageToken);
        console.log(params);
      }
    

    return this.http.get( url, { params } )
      .pipe( map ( (res: any) => {
        // console.log(res);
        this.nextPageToken = res.nextPageToken;
        
        let videos: any[] = [];

        for (let v of res.items) {
          videos.push( v.snippet )
        }

        return videos;

      }) );

      

  }

}
