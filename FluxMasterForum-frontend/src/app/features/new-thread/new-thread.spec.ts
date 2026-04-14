import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThread } from './new-thread';

describe('NewThread', () => {
  let component: NewThread;
  let fixture: ComponentFixture<NewThread>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewThread]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewThread);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
