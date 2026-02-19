import { Component } from '@angular/core';
import { Applicant, APPLICANTS_LIST } from './applicants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  applicants = APPLICANTS_LIST;

  isFormVisible = false;

  newApplicant = this.defaultApplicant();

  deleteApplicant(applicant: Applicant) {
    const idx = this.applicants.indexOf(applicant);
    if (idx > -1) {
      this.applicants.splice(idx, 1);
    }
  }

  defaultApplicant(): Applicant {
    return {
      id: 0,
      name: '',
      role: '',
      experience: '0-5',
      salary: 500000
    };
  }

  saveApplicant() {
    this.applicants.push(this.newApplicant);
    this.newApplicant = this.defaultApplicant();
    this.isFormVisible = false;
  }
}
