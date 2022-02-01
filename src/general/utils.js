
import moment from 'moment';


function isDayOnTheRange(today, customDay, daysOffset) {
    moment.updateLocale('en', {
        week: {
            dow: 1, // Monday is the first day of the week.
        }
    });

    let today_dayOfWeek = moment(today).weekday();
    let customDay_dayOfWeek = moment(customDay).weekday();

    if ((today_dayOfWeek == customDay_dayOfWeek) && (daysOffset == 7)) {
        return true;
    }
    if ((customDay_dayOfWeek > today_dayOfWeek) && (daysOffset < 7)) {
        return true;
    }
    if ((customDay_dayOfWeek < today_dayOfWeek) && (daysOffset > 7)) {
        return true;
    }
    return false;
}


export function isLastWeek(customDay) {
    let customDay_year = customDay.substring(0, 4)
    let customDay_month = customDay.substring(5, 7);
    let customDay_day = customDay.substring(8, 10);

    let today = moment().format("YYYY-MM-DD");
    let today_year = today.substring(0, 4);
    let today_month = today.substring(5, 7);
    let today_day = today.substring(8, 10);

    if (customDay_year == today_year) {
        //Same Year, Same Month
        if (customDay_month == today_month) {
            if (Number(customDay_day) > (Number(today_day) - 14)) {
                let daysOffset = Number(today_day) - Number(customDay_day);

                if (isDayOnTheRange(today, customDay, daysOffset)) {
                    return true;
                }
            }
            return false;
        }
        //Same Year, month before
        if (Number(today_month) - Number(customDay_month) == 1) {
            if (Number(today_day) > 13) {
                return false;
            }

            let daysOffset = (31 - Number(customDay_day)) + Number(today_day);
            if (daysOffset > 13) {
                return false;
            }

            if (isDayOnTheRange(today, customDay, daysOffset)) {
                return true;
            }   
        }
        return false;
    }

    if( Number(today_year) - Number(customDay_year) == 1){
        if(today_month == "01" && customDay_month == "12"){
            if (Number(today_day) > 13) {
                return false;
            }

            let daysOffset = (31 - Number(customDay_day)) + Number(today_day);
            if (daysOffset > 13) {
                return false;
            }

            if (isDayOnTheRange(today, customDay, daysOffset)) {
                return true;
            }  
        }
        return false;
    }
    return false;
}


export function isLastMonth(customDay){
    let customDay_year = customDay.substring(0,4)
    let customDay_month = customDay.substring(5,7);

    let today = moment().format("YYYY-MM-DD");
    let today_year = today.substring(0,4);
    let today_month = today.substring(5,7);

    if (customDay_year == today_year){
      return  (Number(today_month)-Number(customDay_month) == 1);
    }

    if(Number(today_year)-Number(customDay_year) == 1){
      if(today_month == "01" && customDay_month == "12"){
        return true
      }
    }
    
    return false;
  }


export function getUserAverage(data){
    let activeMinutes = 0;
    let calories = 0;
    let distance = 0;
    let steps = 0;

    data.forEach((item) => {
      activeMinutes += item.active_minutes;
      calories += item.calories;
      distance += item.distance;
      steps += item.steps;
    });

    let average = {
      activeMinutes: Math.round(activeMinutes/data.length),
      calories: Math.round(calories/data.length),
      distance: Math.round(distance/data.length),
      steps: Math.round(steps/data.length),
    };

    return average;
}


