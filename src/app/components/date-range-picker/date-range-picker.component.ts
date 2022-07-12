import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { defineLocale } from "ngx-bootstrap/chronos";
import {
  BsDatepickerConfig,
  BsDatepickerInlineConfig,
  BsLocaleService,
} from "ngx-bootstrap/datepicker";
import { trLocale } from "ngx-bootstrap/locale";
defineLocale("tr", trLocale);
import * as moment from "moment-timezone";
export interface DaterangeModel {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: "app-date-range-picker",
  templateUrl: "./date-range-picker.component.html",
  styleUrls: ["./date-range-picker.component.scss"],
  providers: [
    {
      provide: BsDatepickerConfig,
      useValue: <BsDatepickerInlineConfig>{
        isAnimated: true,
        adaptivePosition: true,
      },
    },
  ],
})
export class DateRangePickerComponent implements OnInit {
  dayNumber: number = new Date().getDate() - 1;
  _innerWidth = 0;
  @Input() placeholder: String ;


  @Input() flexPosition: String = undefined;

  ranges = [
    {
      value: [
        moment().add(1, "days").startOf("day").toDate(),
        moment().add(1, "days").endOf("day").toDate(),
      ],
      label: "Yarın",
      selected: false,
    },
    {
      value: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
      label: "Bugün",
      selected: false,
    },
    
    {
      value: [
        moment().subtract(1, "days").startOf("day").toDate(),
        moment().subtract(1, "days").endOf("day").toDate(),
      ],
      label: "Dün",
      selected: false,
    },
    {
      value: [
        moment().subtract(7, "days").startOf("day").toDate(),
        moment().endOf("day").toDate(),
      ],
      label: "Son 7 Gün",
      selected: false,
    },
    {
      value: [
        moment().subtract(30, "days").startOf("day").toDate(),
        moment().endOf("day").toDate(),
      ],
      label: "Son 30 Gün",
      selected: false,
    },

    {
      value: [
        moment().startOf("month").toDate(),
        moment().endOf("day").toDate(),
      ],
      label: "Bu Ay",
      selected: false,
    },

    {
      value: [
        moment().subtract(1, "months").startOf("month").toDate(),
        moment().subtract(1, "months").endOf("month").toDate(),
      ],
      label: "Geçen Ay",
      selected: false,
    },
    {
      value: [
        moment().subtract(1000, "months").startOf("month").toDate(),
        moment().endOf("day").toDate(),
      ],
      label: "Tümü",
      selected: false,
    },
  ];

  dateModel: Date[];

  private _value: DaterangeModel;
  @Input()
  get value(): DaterangeModel {
    if (this._value) {
      return this._value;
    }
  }
  set value(val: DaterangeModel) {
    if (val && val.startDate && val.endDate) {
      this._value = val;
      this.dateModel = [val.startDate, val.endDate];
    }
    if (!val) {
      this._value = undefined as DaterangeModel;
      this.dateModel = [];
      this.rangeSelected = undefined;
    }
  }

  isOpenDateMenu: boolean = false;

  @Output() valueChange = new EventEmitter<DaterangeModel>();
  @Output() valueChange2 = new EventEmitter<DaterangeModel>();
  @Output() dataEvent = new EventEmitter<string>();
  @Output() resetDateBind = new EventEmitter<any>();

  callGetData() {
    this.dataEvent.emit();
  }
  constructor(locale: BsLocaleService) {
    locale.use("tr");
  }

  @HostListener("window:resize", ["$event"])
  listenWindowWidth() {
    this.innerWidth();
  }

  private innerWidth() {
    this._innerWidth = window.innerWidth;
  }

  rangeSelected: String;
  rangeStart: String;
  rangeEnd: String;
  onValueChange(value: Date[]): void {
    if (value.length > 0) {
      this.valueChange.emit({
        startDate: moment(value[0]).startOf("day").toDate(),
        endDate: moment(value[1]).endOf("day").toDate(),
      });
      this.valueChange2.emit({
        startDate: moment(value[0]).startOf("day").toDate(),
        endDate: moment(value[1]).endOf("day").toDate(),
      });
      this.rangeSelected = `${value[0].toLocaleDateString(
        "tr-TR"
      )} - ${value[1].toLocaleDateString("tr-TR")}`;
      this.rangeStart = value[0].toLocaleDateString();
      this.rangeEnd = value[1].toLocaleDateString();
      this.isOpenDateMenu = false;
      this.showCustom = false;
      this.callGetData();
    }
  }

  ngOnInit() {
    if (this.value) {
      this.onValueChange([this.value.startDate, this.value.endDate]);
    }
    this.timeInit();
    this.innerWidth();
  }

  rangeStartEndFix() {
    if (!this.rangeSelected) {
      this.rangeStart = undefined;
      this.rangeEnd = undefined;
    }
  }

  date = new Date();
  timeInit() {
    let endofdayTime = new Date(this.date.setUTCHours(23, 59, 59, 59));
    let startofdayTime = new Date(this.date.setUTCHours(0, 0, 0, 0));
    let endTime = endofdayTime.toISOString().substring(11, 16);
    let currentTime = startofdayTime.toISOString().substring(11, 16);
    this.startTime = currentTime;
    this.endTime = endTime;
  }

  startTime;
  endTime;
  setTime() {
    if (this.value.startDate && this.value.endDate) {
      let st, et, startDate, endDate;
      st = this.startTime.split(":");
      et = this.endTime.split(":");
      startDate = new Date(this.value.startDate.setHours(st[0], st[1]));
      endDate = new Date(this.value.endDate.setHours(et[0], et[1]));
      this.valueChange.emit({
        startDate: startDate,
        endDate: endDate,
      });
    }
  }

  showCustom = false;

  resetDate() {
    this.valueChange.emit({ startDate: undefined, endDate: undefined });
    this.dateModel = [];
  }

  reset() {
    this.isOpenDateMenu = false;
    this.showCustom = false;
    this.resetDateBind.emit();
    this.callGetData();
  }

  setDate() {
    this.onValueChange([
      new Date(new Date().setDate(new Date().getDate() - 5)),
      new Date(),
    ]);
  }
}
