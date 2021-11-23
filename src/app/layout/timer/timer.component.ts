import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DataSharingServiceProxies } from '@shared/service-proxies/data-sharing-service-proxies';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent extends AppComponentBase implements OnInit {

  length = Math.PI * 2 * 100;
  intervalTimerSub: Subscription;
  started = false;
  timeLeft;
  wholeTime = 0.5 * 60; // manage this to set the whole time
  timerValue = '';
  isRunning = false;
  css = {
    strokeDasharray: this.length,
    strokeDashoffset: '',
    transform: '',
    stroke: 'white'
  };
  minutes: number;
  seconds: number;
  data = {
    snoozeIntervalMin: 0
  };
  isPause = false;

  constructor(injector: Injector, private _dataSharingService: DataSharingServiceProxies) {
    super(injector);
  }

  ngOnInit(): void {
    this._dataSharingService.pauseRefreshDataOnPage.subscribe(result => {
      if (this.started && !this.isPause) {
        if (result && this.isRunning) {
          this.startTimer();
        } else if (!result && !this.isRunning) {
          this.startTimer();
        }
      }
    });

    this._dataSharingService.refreshTimeChanged.subscribe(result => {
      if (this.started && !this.isPause) {
        if (result && this.isRunning) {
          this.stopTimer();
          this.data.snoozeIntervalMin = parseInt(result);
          this.startTimer();
        } else if (!result && !this.isRunning) {
          this.data.snoozeIntervalMin = 1;
          this.startTimer();
        }
      }
    });
    this.getRefreshTime();
  }

  pauseTimer() {
    this.isPause = !this.isPause;
    this.startTimer();
  }

  startTimer() {
    this.wholeTime = this.data.snoozeIntervalMin * 60;
    this.startActualTimer();
  }

  updateCss(value, timePercent) {
    let offset = - this.length - this.length * value / (timePercent);
    this.css.strokeDashoffset = offset.toString();
    this.css.transform = 'rotate(' + 360 * value / (timePercent) + 'deg)';
  }

  timer(seconds) { //counts time, takes seconds
    let remainTime = Date.now() + (seconds * 1000);
    this.displayTimeLeft(seconds);

    let intervalTimer = interval(1000);
    this.intervalTimerSub = intervalTimer.subscribe(n => {
      this.timeLeft = Math.round((remainTime - Date.now()) / 1000);
      if (this.timeLeft < 0) {
        this.intervalTimerSub.unsubscribe();
        this.displayTimeLeft(this.wholeTime);
        this.started = !this.started;
        this.isRunning = !this.isRunning;
        this._dataSharingService.refreshDataOnPage.next(true);
        this.startTimer();
        //window.location.reload();
      }
      if (this.timeLeft < 30) {
        this.css.stroke = 'red';
      } else {
        this.css.stroke = '#03318c';
      }
      this.displayTimeLeft(this.timeLeft);
    });
  }

  displayTimeLeft(timeLeft) { //displays time on the input
    this.minutes = Math.floor(timeLeft / 60);
    this.seconds = timeLeft % 60;
    if (this.started) {
      this.updateCss(timeLeft, this.wholeTime);
    }
  }

  startActualTimer() {
    this.isRunning = !this.isRunning;
    if (!this.started) {
      this.started = !this.started;

      this.timer(this.wholeTime);
    } else if (this.isRunning) {
      this.timer(this.timeLeft);
    } else {
      this.intervalTimerSub.unsubscribe();
    }
  }

  stopTimer() {
    this.isRunning = false;
    this.intervalTimerSub.unsubscribe();

    this.wholeTime = 0;
    this.started = false;
  }

  // pause and resume functionality
  toggleClock() {
    this.startActualTimer();
  }

  getRefreshTime() {
    const interval = abp.setting.get('Abp.Localization.RefreshInterval');
    if (interval) {
      this.data.snoozeIntervalMin = parseInt(interval);
    } else {
      this.data.snoozeIntervalMin = 1;
    }
    this.startTimer();
  }
}
