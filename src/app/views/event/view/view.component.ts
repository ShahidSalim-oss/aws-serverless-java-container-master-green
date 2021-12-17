import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Event} from '../../../models/model';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../../../services/backend.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  event: Event;
  loading: boolean = true;
  id: string;
  constructor(private backendService: BackendService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEvent(this.id);
  }

  getEvent(id: string) {
    const apiKey = localStorage.getItem('apiKey');
    this.backendService.getEvent(apiKey, id).subscribe(
      response => {
        this.event = response;
        this.loading = false;
      }
    );
  }

}