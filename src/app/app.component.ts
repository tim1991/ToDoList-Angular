import {Component} from '@angular/core';
import {Task} from './models/task.model';
import {AbstractControl,FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDo list App';
  taskName: string = '';
  taskList: (Task)[] = [];
  form!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getDataFromLocalStorage();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
        taskName: ['', Validators.required]
      }

    );
  }
  get f(): {[key: string]: AbstractControl} {return this.form.controls;}

  getDataFromLocalStorage() {
    if (localStorage.getItem("tasks")) {
      let items: any = localStorage.getItem("tasks");
      let taskList = JSON.parse(items);
      this.taskList = taskList;
    }

  }

  addTask() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let task = new Task(this.taskList.length, this.taskName, new Date(), false);
    this.taskList.push(task);
    this.sortArray();
    localStorage.setItem("tasks", JSON.stringify(this.taskList));
    this.taskName = '';
  }

  sortArray() {
    //Uncomplete task first
    this.taskList.sort(function (x, y) {
      return (x.done === y.done) ? 0 : x.done ? 1 : -1;
    });
    
  }

  completeTask(taskItem: any) {
    if (taskItem.action == 'complete') {
      let task: any;
      task = this.taskList.find(task => task.id == taskItem.task.id);
      task.done = true;
    } else if (taskItem.action == 'delete') {
      this.taskList.splice(
        this.taskList.indexOf(taskItem.task), 1
      );
    }
    this.sortArray();
    localStorage.setItem("tasks", JSON.stringify(this.taskList));
  }
}
