import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreTrackComponent } from './more-track.component';

describe('MoreTrackComponent', () => {
  let component: MoreTrackComponent;
  let fixture: ComponentFixture<MoreTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreTrackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
