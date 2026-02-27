import { Component, signal } from '@angular/core';
import { Changelog } from './changelog/changelog';
import { Control } from './control/control';
import { ChangelogEntry, VersionNumber, VersionType } from './models';

@Component({
  selector: 'app-root',
  imports: [Changelog, Control],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  version: VersionNumber = {
    major: 0,
    minor: 0,
    patch: 1
  };

  changes: ChangelogEntry[] = [];

  incrementVersion(type: VersionType) {
    if (type === 'major') {
      this.version.major++;
      this.version.minor = 0;
      this.version.patch = 0;
    } else if (type === 'minor') {
      this.version.minor++;
      this.version.patch = 0;
    } else if (type === 'patch') {
      this.version.patch++;
    }

    this.changes.unshift({
      type: type,
      newValue: this.version[type],
      oldValue: this.version[type] - 1
    });
  }

}
