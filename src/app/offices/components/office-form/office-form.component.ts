import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficeFacade } from '../../facades/office.facade';
import { Office } from '../../models/office.model';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss'],
  providers: [OfficeFacade],
})
export class OfficeFormComponent implements OnInit {
  officeForm: FormGroup;

  officeToUpdate: Office | null = null;
  update: boolean = false;
  ownsActivities: boolean = false;

  constructor(
    public officeFacade: OfficeFacade,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.officeForm = this.fb.group({
      name: ['',[Validators.required,Validators.pattern('^[\u0000-\u007F]{3,}$')]],
      location:  ['',[Validators.required,Validators.pattern('^[\u0000-\u007F]{3,}$')]],
      officeCode: ['', Validators.required],
      ownsActivities: false,
      parent: null,
    });
  }

  ngOnInit(): void {
    if (this.update) {
      this.officeFacade.selectedOffice$.subscribe((data) => {
        this.officeToUpdate = data;
        this.officeForm.patchValue({ ...this.officeToUpdate });
      });
    }
  }

  save() {
    const { valid, touched, dirty } = this.officeForm;
    if (valid && (touched || dirty)) {
      if (!this.update) {
        console.log({ ...this.officeForm.value });
        this.officeFacade.addOffice({
          ...this.officeForm.value,
        });
      }

      if (this.update && this.officeToUpdate?.id) {
        this.officeFacade.updateOffice(this.officeToUpdate?.id, {
          ...this.officeForm.value,
        });
      }
    }
  }

  officeComparator(office1: Office, office2: Office) {
    return (
      office1.id === office2.id &&
      office1.name === office2.name &&
      office1.location == office2.location
    );
  }
}
