import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModulesService } from 'src/app/Services/Modulos/modules.service';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/Admin/admin.service';


@Component({
  selector: 'app-create-new-release',
  templateUrl: './create-new-release.component.html',
  styleUrls: ['./create-new-release.component.css']
})
export class CreateNewReleaseComponent implements OnInit {

  form: FormGroup;
  fileToUpload: File = null;

  constructor(private admin: AdminService, private moduleService: ModulesService, private fb: FormBuilder) { this.createForm(); }

  ngOnInit(): void { }
  //Nombres validation
  get invalidTitle() {
    return this.form.get("title").invalid && this.form.get('title').touched;

  }
  get validTitle() {
    return this.form.get("title").valid && this.form.get('title').touched;
  }
  //Apellidos validation
  get apellidosNoValido() {
    return this.form.get("paragraph").invalid && this.form.get('paragraph').touched;
  }
  get apellidosValido() {
    return this.form.get("paragraph").valid && this.form.get('paragraph').touched;
  }

  //Validations ends

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      paragraph: ['', [Validators.required,]]
    });
  }

  // Create Employee
  createRelease() {
    console.log('ya');
  }
}
