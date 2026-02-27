import { Component, output } from '@angular/core';
import { VersionType } from '../models';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.css',
})
export class Control {
  versionChanged = output<VersionType>();
}
