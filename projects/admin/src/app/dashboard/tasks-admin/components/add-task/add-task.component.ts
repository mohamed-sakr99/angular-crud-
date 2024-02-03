import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  users: any = [
    { name: 'Mohamed', id: '65b749c9b661d836a7841c64' },
    { name: 'Ali', id: '65b74a9ab661d836a7841c67' },
    { name: 'Ahmed', id: '65bb7ba294607fb4aff8b5dd' },
  ];
  newTaskFrom!: FormGroup;
  fileName: string = '';
  formValues: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskService: TasksService,
    private toaster: ToastrService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.createForm();
    console.log('data', this.data);
  }
  createForm() {
    this.newTaskFrom = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId?._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data ? new Date(this.data.deadline).toISOString() : '',
        Validators.required,
      ],
    });
    this.formValues = this.newTaskFrom.value;
  }
  // this away to send form data
  //   createTask() {
  //     let formData = new FormData();
  //     formData.append('title', this.newTaskFrom.value['title']),
  //       formData.append('userId', this.newTaskFrom.value['userId']),
  //       formData.append('userId', this.newTaskFrom.value['image']),
  //       formData.append('userId', this.newTaskFrom.value['description']),
  //       formData.append('userId', this.newTaskFrom.value['deadline']),
  //     this.taskService.createTask(formData).subscribe((res) => {

  //     })
  //     console.log(this.newTaskFrom.value);

  // }

  // another way to send form data
  createTask() {
    let model = this.prepareFormData();
    this.taskService.createTask(model).subscribe((res) => {
      console.log('res tasks', res);

      this.toaster.show('task created successfully', 'success');
      this.dialogRef.close(true);
    });
  }
  prepareFormData() {
    let formData = new FormData();
    // let newDate = moment(this.newTaskFrom.value['deadline']).format('DD-MM-YYYY');
    // this.newTaskFrom.get('deadline')?.setValue(newDate)
    Object.entries(this.newTaskFrom.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });
    return formData;
  }
  UpdateTask() {
    let model = this.prepareFormData();
    this.taskService.updateTask(model, this.data?._id).subscribe((res) => {
      this.toaster.show('task updated successfully', 'success');
      this.dialogRef.close(true);
    });
  }
  selectImage(event: any) {
    this.fileName = event.target.value;
    this.newTaskFrom.get('image')?.setValue(event.target.files[0]);
    console.log('file', event.target.files[0]);
  }
  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if (this.formValues[item] != this.newTaskFrom.value[item]) {
        hasChanges = true;
      }
    });
    if (hasChanges) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '450px',
        height: '100px',
      });

      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      this.dialogRef.close();
    }
  }
}
