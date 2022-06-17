import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";


@Injectable()
export class TurkishDatePickerI18 extends NgbDatepickerI18n {
    getWeekdayLabel(weekday: number): any {
        switch (weekday) {
            case 1:
                return "Pzt";
            case 2:
                return "Sal";
            case 3:
                return "Çar";
            case 4:
                return "Per";
            case 5:
                return "Cum";
            case 6:
                return "Cts";
            case 7:
                return "Paz";
        }
    }
    getWeekdayShortName(weekday: number): any {
        switch (weekday) {
            case 1:
                return "Pzt";
            case 2:
                return "Sal";
            case 3:
                return "Çar";
            case 4:
                return "Per";
            case 5:
                return "Cum";
            case 6:
                return "Cts";
            case 7:
                return "Paz";
        }
    }
    getMonthShortName(month: number): any {
        switch (month) {
            case 1: return "Ock";
            case 2: return "Şub";
            case 3: return "Mar";
            case 4: return "Nis";
            case 5: return "May";
            case 6: return "Haz";
            case 7: return "Tem";
            case 8: return "Ağu";
            case 9: return "Eyl";
            case 10: return "Eki";
            case 11: return "Kas";
            case 12: return "Ara";

        }
    }
    getMonthFullName(month: number): any {
        switch (month) {
            case 1: return "Ocak";
            case 2: return "Şubat";
            case 3: return "Mart";
            case 4: return "Nisan";
            case 5: return "Mayıs";
            case 6: return "Haziran";
            case 7: return "Temmuz";
            case 8: return "Ağustos";
            case 9: return "Eylül";
            case 10: return "Ekim";
            case 11: return "Kasım";
            case 12: return "Aralık";

        }
    }
    getDayAriaLabel(date: NgbDateStruct): any {
        return "";
    }
}
