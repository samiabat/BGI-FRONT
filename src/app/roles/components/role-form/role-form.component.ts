import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficeFacade } from 'src/app/offices/facades/office.facade';
import { Office } from 'src/app/offices/models/office.model';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],

  providers: [RoleFacade, OfficeFacade],
})
export class RoleFormComponent implements OnInit {
  statForm: FormGroup;

  statToUpdate: Role | null = null;
  update: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roleFacade: RoleFacade,
    public officeFacade: OfficeFacade,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.statForm = this.fb.group({
      description: ['', Validators.required],
      owner: '',
    });
  }

  ngOnInit(): void {
    if (this.update) {
      this.roleFacade.selectedRole$.subscribe((data) => {
        this.statToUpdate = data;
        this.statForm.patchValue({ ...this.statToUpdate });
      });
    }
  }

  save() {
    const { valid, touched, dirty } = this.statForm;
    if (valid && (touched || dirty)) {
      if (!this.update) {
        console.log({ ...this.statForm.value });
        this.roleFacade.addRole({
          ...this.statForm.value,
        });
      }

      if (this.update && this.statToUpdate?.id) {
        this.roleFacade.updateRole(this.statToUpdate?.id, {
          ...this.statForm.value,
        });
      }
    }
  }

  officeComparator(office1: Office, office2: Office) {
    return (
      office1?.id === office2?.id &&
      office1?.name === office2?.name &&
      office1?.location == office2?.location
    );
  }
}
