import { Component, input } from '@angular/core';
import { ChangelogEntry } from '../models';

@Component({
  selector: 'app-changelog',
  imports: [],
  templateUrl: './changelog.html',
  styleUrl: './changelog.css',
})
export class Changelog {
  changelog = input<ChangelogEntry[]>();
}
