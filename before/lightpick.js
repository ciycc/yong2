        
       /**
         * 수정파일: lightpick.js  line.425~
         * 주석: 2022-11-25
         * 설명: 아래 1줄(const getmonth ~) 추가해주고, 
         *      기존 코드 1줄(day = moment(monthDate).subtract~) 수정했어
        */

      renderCalendar = function(el, opts) {
            var html = '',
            monthDate = moment(opts.calendar[0]);
            //2022-11-25 추가(1)
            const getMonth = new Date().getMonth();

            for (var i = 0; i < opts.numberOfMonths; i++) {
                var day = moment(monthDate);
                //2022-11-25 수정(1)
                //day = moment(monthDate).subtract(11, 'month');
                day = moment(monthDate).subtract(getMonth, 'month');
                
                // if(opts.period) {
                //     day = moment(monthDate).subtract(11, 'month');
                //     renderMonthsList(day, opts);
                //     renderYearsList(day, opts);
                // }
        
                html += '<section class="lightpick__month">';
                html += '<div class="lightpick__month-title-bar">';
                html +=
                    '<div class="lightpick__month-title">' +
                    renderMonthsList(day, opts) +
                    renderYearsList(day, opts) +
                    '</div>';
                
                if (opts.numberOfMonths === 1) {
                    html += renderTopButtons(opts, 'days');
                }
        
                html += '</div>'; // lightpick__month-title-bar
        
                html += '<div class="lightpick__days-of-the-week">';
                for (var w = opts.firstDay + 4; w < 7 + opts.firstDay + 4; ++w) {
                    html +=
                    '<div class="lightpick__day-of-the-week" title="' +
                    weekdayName(opts, w, 'long') +
                    '">' +
                    weekdayName(opts, w) +
                    '</div>';
                }
                html += '</div>'; // lightpick__days-of-the-week
        
                html += '<div class="lightpick__days">';
        
                if (day.isoWeekday() !== opts.firstDay) {
                    var prevDays =
                        day.isoWeekday() - opts.firstDay > 0
                        ? day.isoWeekday() - opts.firstDay
                        : day.isoWeekday(),
                    prevMonth = moment(day).subtract(prevDays, 'day'),
                    daysInMonth = prevMonth.daysInMonth();
        
                    for (var d = prevMonth.get('date'); d <= daysInMonth; d++) {
                    html += renderDay(opts, i > 0, 'dummy');
                    }
                }
        
                var daysInMonth = day.daysInMonth(),
                    today = new Date();
        
                for (var d = 0; d < daysInMonth; d++) {
                    html += renderDay(opts, day);
        
                    day.add(1, 'day');
                }
        
                var nextMonth = moment(day),
                    nextDays = 7 - nextMonth.isoWeekday() + opts.firstDay;
        
                if (nextDays < 7) {
                    for (var d = nextMonth.get('date'); d <= nextDays; d++) {
                    html += renderDay(
                        opts,
                        i < opts.numberOfMonths - 1,
                        'dummy'
                    );
                    }
                }
        
                html += '</div>'; // lightpick__days
        
                html += '</section>'; // lightpick__month
        
                monthDate.add(1, 'month');
            }
    
            opts.calendar[1] = moment(monthDate);
    
            el.querySelector('.lightpick__months').innerHTML = html;
        },
