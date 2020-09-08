import { Photo } from './../photo/photo';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photosBack: Photo[] = [];

  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userName = this.activatedRoute.snapshot.params.user;
    this.photoService.listFromUser(userName).subscribe((photos) => {
      this.photosBack = photos;
    });
  }
}
