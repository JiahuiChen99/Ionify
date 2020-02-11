import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MusicDetailsPage } from './music-details.page';

describe('MusicDetailsPage', () => {
  let component: MusicDetailsPage;
  let fixture: ComponentFixture<MusicDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MusicDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
