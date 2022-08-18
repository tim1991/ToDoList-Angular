import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'task-item',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

 
  @Input()  task: Task = new Task(0,'',new Date,false);
  @Output() bookTitleCreated = new EventEmitter<{ task: Task,action:string }>();



  completeItem(value:Task,action='complete') {
    debugger;
    this.bookTitleCreated.emit({ task: value,action:action });
  }



}
