
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../../services/weather-service/weather.service';
import { SET_LOCATION } from 'src/app/location-reducer';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  loc$: Observable<string>;
  loc: string = 'barzanò';
  currentWeather: any = <any>{};
  msg: string = '';
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {

    this.store.dispatch({ type: SET_LOCATION, payload: this.loc });

    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    })
  }
  ngOnInit() {
  }
  
  searchWeather(loc: string) {

    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.currentWeather = res;
      }, err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      }, () => {
})
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}