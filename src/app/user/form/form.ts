import { Z_MODAL_DATA } from '@/shared/components/dialog';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSelectComponent, ZardSelectItemComponent } from '@/shared/components/select';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISOption, IUser } from '../user.interface';
import { GAME_OF_CHOICE, LANGUAGE_LIST } from '../user.constant';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ReactiveFormsModule, ZardInputDirective, ZardSelectComponent, ZardSelectItemComponent],
  templateUrl: './form.html',
})
export class Form {
  private zData: IUser = inject(Z_MODAL_DATA);
  LANGUAGE_LIST: ISOption[] = LANGUAGE_LIST;
  GAME_OF_CHOICE: ISOption[] = GAME_OF_CHOICE;

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    language: new FormControl(''),
    gameOfChoice: new FormControl(''),
    totalRevenue: new FormControl(),
    added: new FormControl(new Date().toDateString()),
    trend: new FormControl(''),
    lastUpdate: new FormControl(new Date().toDateString()),
  });

  ngAfterViewInit(): void {
    if (this.zData) {
      this.form.patchValue(this.zData);
    }
  }
}
