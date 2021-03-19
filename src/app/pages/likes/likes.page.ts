import { Component, OnInit } from '@angular/core';
import { SallefyAPIService } from 'src/app/services/sallefy-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {

  likedTracks: Observable<any>;

  constructor(private service: SallefyAPIService) { }

  ngOnInit() {
    this.service.retrieveLikedTracks().
    subscribe(
      data => {this.likedTracks = data;
        console.log(this.likedTracks);
      }
    );
  }

}
