import { Component, OnInit } from '@angular/core';
import Unsplash, { toJson } from 'unsplash-js';
import { CredentialsService } from './services/credentials.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'random-snapps';
  private NUM_PHOTOS = 25;
  private unsplash;
  private authenticationUrl;
  private credentials;
  private keyword;
  private errorMessages = [];
  private photosToDisplay;

  constructor(private credentialsService: CredentialsService) {}

  ngOnInit() {

    // retrieve Unpslash credentials for this app:
    this.credentialsService.getCredentials()
      .subscribe(
        (data) => {
          const credentials = data;

          // initialize Unsplash object:
          this.unsplash = new Unsplash({
            applicationId: credentials['APP_ACCESS_KEY'],
            secret: credentials['APP_SECRET']
          });

          if (!this.unsplash) {
            this.errorMessages.push('Please check your credentials');
          } else {
            this.getRandomPhotos();
          }
        },
        (error: any) => {
          const errorMessage = error.message ? error.message : error.toString();
          this.errorMessages.push(errorMessage);
        }
      );
  }


  searchPhotosByKeyword() {
    if (this.unsplash) {
      this.unsplash.search.photos(this.keyword, this.NUM_PHOTOS)
        .then(toJson)
        .then(json => {
          if (json.errors) {
            for (let i = 0; i < json.errors; i++) {
              this.errorMessages.push(json.errors[i]);
            }
          } else {
              if (json.results.length === 0) {
                this.errorMessages.push('No photos found for \'' + this.keyword + '\'');
              } else {
                this.photosToDisplay = json.results;
              }
          }
        });
    } else {
      this.errorMessages.push('Unable to search');
    }
  }


  getRandomPhotos() {

    this.unsplash.photos.getRandomPhoto({ count: this.NUM_PHOTOS })
      .then(toJson)
      .then(json => {
        if (json.errors) {
          for (let i = 0; i < json.errors; i++) {
            this.errorMessages.push(json.errors[i]);
          }
        } else {
          this.photosToDisplay = json;
        }
      });
    }

}
