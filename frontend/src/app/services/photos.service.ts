import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { AddPhotoData, Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http: HttpClient,
  ) {}

  fetchPhotos(id?: string) {
    const byUser = id ? ('?byUser=' + id) : '';
    return this.http.get<Photo[]>(env.apiUrl + '/photos' + byUser);
  }

  addPhoto(photoData: AddPhotoData) {
    const formData = new FormData();
    Object.keys(photoData).forEach((data) => {
      formData.append(data, photoData[data]);
    });

    return this.http.post(env.apiUrl + '/photos', formData);
  }

  removePhoto(id: string) {
    return this.http.delete(env.apiUrl + '/photos/' + id);
  }

}
