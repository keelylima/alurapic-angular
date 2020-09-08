import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from './../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photosBack: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMoreList: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.user;
    this.photosBack = this.activatedRoute.snapshot.data.photos;
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => (this.filter = filter));
  }
  ngOnDestroy(): void {
    //trabalhando com subscribe/rxjs
    //nunca chega no debounce.complete()
    //ele fica ocupando espaço na memoria mesmo indo pra outras áreas, usar o unsubscribe para destruir isso
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.photosBack = this.photosBack.concat(photos);
        if (!photos.length) {
          this.hasMoreList = false;
        }
      });
  }
}
