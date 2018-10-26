import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CredentialsService } from './services/credentials.service';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { PhotoGridComponent } from './components/photo-grid/photo-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessagesComponent,
    PhotoGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CredentialsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
