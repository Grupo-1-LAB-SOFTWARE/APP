import { Component, Input } from '@angular/core';
import { ensino } from 'src/app/core/interfaces/ensino.interface';

@Component({
  selector: 'app-radoc-create',
  templateUrl: './radoc-create.component.html',
  styleUrls: ['./radoc-create.component.scss']
})
export class RadocCreateComponent {
  @Input() isCreate!: boolean;

  @Input() ensino: ensino | undefined;

  @Input() ensinoSize: number | undefined;
}
