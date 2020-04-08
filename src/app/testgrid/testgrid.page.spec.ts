import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestgridPage } from './testgrid.page';

describe('TestgridPage', () => {
  let component: TestgridPage;
  let fixture: ComponentFixture<TestgridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestgridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestgridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
