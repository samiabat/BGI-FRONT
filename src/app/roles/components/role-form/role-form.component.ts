import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleFacade } from '../../facades/role.facade';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],

  providers: [RoleFacade, RoleFacade],
})
export class RoleFormComponent implements OnInit {
  statForm: FormGroup;

  statToUpdate: Role | null = null;
  update: boolean = false;

  constructor(
    private fb: FormBuilder,
    private roleFacade: RoleFacade,
    @Inject(MAT_DIALOG_DATA) private data: { update: boolean }
  ) {
    this.update = this.data.update;
    this.statForm = this.fb.group({
      name: ['', Validators.required],
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

  officeComparator(role1: Role, role2: Role) {
    return (
      role1?.id === role2?.id &&
      role1.name === role2.name &&
      role1.description === role2.description
    );
  }
}
