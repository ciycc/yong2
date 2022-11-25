        
       /**
         * 수정파일: lightpick.js  line.425~
         * 주석: 2022-11-25
         * 설명: '2022-11-25'로 검색하고, 문장 검색해서 수정해~^^
        */
        
        renderCalendar = function(el, opts) {
            var html = '',
            monthDate = moment(opts.calendar[0]);
    
            for (var i = 0; i < opts.numberOfMonths; i++) {
                var day = moment(monthDate);
        
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
            //2022-11-25 추가(9줄)
            setTimeout(() => {
                if(!window.openShowInit) return;
                const element = $(el).find('.is-start-date').closest('.lightpick__month');
                if(element && element.length) {
                   const top = $(el).scrollTop() + element.position().top
                   $(el).scrollTop(top);
                   window.openShowInit = false;
                }
            }, 200);
        },
        updateDates = function(el, opts) {
            var days = el.querySelectorAll('.lightpick__day');
            [].forEach.call(days, function(day) {
            day.outerHTML = renderDay(
                opts,
                parseInt(day.getAttribute('data-time')),
                false,
                day.className.split(' ')
            );
            });
    
            checkDisabledDatesInRange(el, opts);
        },
        /* 02 */
            gotoDate: function(date) {
                var date = moment(date, this._opts.format);
                //2022-11-25 수정 및 추가(5줄)
                if (this.getDate() && this.getDate()._i) {
                    date = moment(moment(this.getDate()._i).get('year') + '.01.01');
                } else {
                    date = moment(moment().get('year') + '.01.01');
                }
                
                date.set('date', 1);
        
                this._opts.calendar = [moment(date)];
        
                renderCalendar(this.el, this._opts);
            },
            /* 03 */
            show: function(target) {
                //2022-11-25 추가(1줄)
                window.openShowInit = true;
                document.body.append(this.el);
                if (!this.isShowing) {
                    this.isShowing = true;

                    if (this._opts.repick) {
                        this._opts.repickTrigger = target;
                    }

                    this.syncFields();

                    this.gotoDate(this._opts.endDate);

                    this.el.classList.remove('is-hidden');

                    var top = this.el.offsetTop + this.el.children[0].offsetHeight;

                    if (typeof this._opts.onOpen === 'function') {
                        this._opts.onOpen.call(this);
                    }

                    if (typeof this._opts.period === 'function') {
                        this.el.scrollTo({top: top});
                    }else{
                        this.gotoDate(this._opts.startDate);
                    }
                }
            },
