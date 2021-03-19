import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadTrackPage } from './upload-track.page';

describe('UploadTrackPage', () => {
  let component: UploadTrackPage;
  let fixture: ComponentFixture<UploadTrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTrackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
