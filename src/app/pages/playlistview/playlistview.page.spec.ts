import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaylistviewPage } from './playlistview.page';

describe('PlaylistviewPage', () => {
  let component: PlaylistviewPage;
  let fixture: ComponentFixture<PlaylistviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
