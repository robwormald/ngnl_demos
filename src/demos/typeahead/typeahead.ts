import {Component} from 'angular2/core'
import {Control} from 'angular2/common'
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http'
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable'

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0';

const makeURL = (query) => `${BASE_URL}?q=${query}&part=snippet&key=${API_TOKEN}`

@Component({
  selector: 'my-typeahead',
  template: `
     <input type="text" placeholder="search youtube..." [ngFormControl]="searchInput">
     <ul>
       <li *ngFor="#video of videos | async">{{video | json}}</li>
     </ul>
  `
})
class MyTypeahead {
  videos: Observable<any[]>;
  searchInput = new Control();
  constructor(http:Http){
    this.videos = this.searchInput.valueChanges
      .debounceTime(200)
      .map(query => makeURL(query))
      .switchMap(url => http.get(url))
      .map((res:Response) => res.json())
      .map(response => response.items)
      
  }
}


@Component({
  selector: 'typeahead-demo',
  template: `
    <h2>typeahead demo</h2>
    <my-typeahead></my-typeahead>
    <ul></ul>
  `,
  providers: [HTTP_PROVIDERS],
  directives: [MyTypeahead]
})
export class TypeaheadDemo {
  constructor(private http:Http){}
}
