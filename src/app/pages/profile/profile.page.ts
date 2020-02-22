import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    
    //@ViewChild('slide') slideWithNav: IonSlides;
    
    constructor() { }
    
  ngOnInit() {
  }

  slideOpts = {
    slidesPerView: 1,
    freeMode: true,
    speed: 10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
 
  newGames = [{
    image: 'https://img.mobiscroll.com/demos/worms3.png',
    title: 'Worms 3',
    dev: 'Team 17 Digital Limited',
    rank: 4.2
}, {
    image: 'https://img.mobiscroll.com/demos/candycrush.png',
    title: 'Candy Crush Saga',
    dev: 'King',
    rank: 4.3
}, {
    image: 'https://img.mobiscroll.com/demos/angrybirds.png',
    title: 'Angry Birds',
    dev: 'Rovino',
    rank: 4.4
}, {
    image: 'https://img.mobiscroll.com/demos/nfs.png',
    title: 'Need for Speed™ No Limits',
    dev: 'ELECTRONIC ARTS',
    rank: 4.3
}, {
    image: 'https://img.mobiscroll.com/demos/heartstone.png',
    title: 'Hearthstone',
    dev: 'Blizzard Entertainment Inc.',
    rank: 4.2
}, {
    image: 'https://img.mobiscroll.com/demos/fruitninja.png',
    title: 'Fruit Ninja',
    dev: 'Halfbrick Studios',
    rank: 4.3
}, {
    image: 'https://img.mobiscroll.com/demos/subwaysurf.png',
    title: 'Subway Surfers',
    dev: 'Kiloo',
    rank: 4.4
}, {
    image: 'https://img.mobiscroll.com/demos/templerun.png',
    title: 'Temple Run',
    dev: 'Imangi Studios',
    rank: 4.3
}, {
    image: 'https://img.mobiscroll.com/demos/minecraft.png',
    title: 'Minecraft: Pocket Edition',
    dev: 'Mojang ',
    rank: 4.4
}];


    isEnd(){
        
    }

    print() {
        console.log("Hello");
    }
}
