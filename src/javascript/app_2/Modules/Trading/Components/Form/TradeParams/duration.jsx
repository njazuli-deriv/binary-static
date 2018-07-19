import {
    PropTypes as MobxPropTypes,
    observer }                  from 'mobx-react';
import moment                   from 'moment';
import PropTypes                from 'prop-types';
import React                    from 'react';
import Datepicker               from '../../../../../App/Components/Form/DatePicker';
import Dropdown                 from '../../../../../App/Components/Form/dropdown.jsx';
import Fieldset                 from '../../../../../App/Components/Form/fieldset.jsx';
import InputField               from '../../../../../App/Components/Form/input_field.jsx';
import TimePicker               from '../../../../../App/Components/Form/time_picker.jsx';
import { localize }             from '../../../../../../_common/localize';

/* TODO:
      1. Change expiry date to drop-down if start date is forward starting
*/

const expiry_list = [
    { text: localize('Duration'), value: 'duration' },
];

let now_date,
    min_date_duration,
    max_date_duration,
    min_date_expiry,
    start_date_time;

const Duration = ({
    duration,
    duration_unit,
    duration_units_list,
    expiry_date,
    expiry_time,
    expiry_type,
    onChange,
    is_minimized,
    is_nativepicker,
    server_time,
    sessions,
    start_date,
    start_time,
}) => {
    const moment_now = moment(server_time);
    if (!now_date || moment_now.date() !== now_date.date()) {
        const moment_today = moment_now.clone().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

        now_date          = moment_now.clone();
        min_date_duration = moment_today.clone().add(1, 'd');
        max_date_duration = moment_today.clone().add(365, 'd');
        min_date_expiry   = moment_today.clone();
    }
    const moment_expiry = moment.utc(expiry_date);
    const is_same_day   = moment_expiry.isSame(moment(start_date * 1000 || undefined).utc(), 'day');
    if (is_same_day) {
        const date_time = moment.utc(start_date * 1000 || undefined);
        if (start_date) {
            const [ hour, minute ] = start_time.split(':');
            date_time.hour(hour).minute(minute).second(0).add(5, 'minutes');
        }
        // only update start time every five minutes, since time picker shows five minute durations
        const moment_start_date_time = moment.unix(start_date_time);
        if (!start_date_time || moment_start_date_time.isAfter(date_time) || moment_start_date_time.clone().add(5, 'minutes').isBefore(date_time) ||
            (moment_start_date_time.minutes() !== date_time.minutes() && date_time.minutes() % 5 === 0)) {
            start_date_time = date_time.unix();
        }
    }
    if (is_minimized) {
        const duration_unit_text = (duration_units_list.find(o => o.value === duration_unit) || {}).text;
        return (
            <div className='fieldset-minimized duration'>
                <span className='icon trade-duration' />
                {expiry_type === 'duration'
                    ? `${duration} ${duration_unit_text}`
                    : `${moment_expiry.format('ddd - DD MMM, YYYY')}\n${expiry_time}`
                }
            </div>
        );
    }

    const has_end_time = expiry_list.find(expiry => expiry.value === 'endtime');
    if (duration_units_list.length === 1 && duration_unit === 't') {
        if (has_end_time) {
            expiry_list.pop(); // remove end time for contracts with only tick duration
        }
    } else if (!has_end_time) {
        expiry_list.push({ text: localize('End Time'), value: 'endtime' });
    }

    return (
        <Fieldset
            header={localize('Trade Duration')}
            icon='trade-duration'
        >
            <Dropdown
                list={expiry_list}
                value={expiry_type}
                name='expiry_type'
                onChange={onChange}
                is_nativepicker={is_nativepicker}
            />

            {expiry_type === 'duration' ?
                <React.Fragment>
                    <div className='duration-container'>
                        {duration_unit === 'd' && !is_nativepicker ?
                            <Datepicker
                                name='duration'
                                min_date={min_date_duration}
                                max_date={max_date_duration}
                                mode='duration'
                                onChange={onChange}
                                value={duration || 1} // TODO: replace 1 with min duration
                                is_nativepicker={is_nativepicker}
                                footer={localize('The minimum duration is 1 day')}
                            /> :
                            <InputField
                                type='number'
                                name='duration'
                                value={duration}
                                onChange={onChange}
                                is_nativepicker={is_nativepicker}
                            />
                        }
                        <Dropdown
                            list={duration_units_list}
                            value={duration_unit}
                            name='duration_unit'
                            onChange={onChange}
                            is_nativepicker={is_nativepicker}
                        />
                    </div>
                </React.Fragment> :
                <React.Fragment>
                    <div className='endtime-container'>
                        <Datepicker
                            name='expiry_date'
                            has_today_btn
                            min_date={min_date_expiry}
                            max_date={max_date_duration}
                            onChange={onChange}
                            value={expiry_date}
                            is_nativepicker={is_nativepicker}
                        />
                        {is_same_day &&
                            <TimePicker
                                onChange={onChange}
                                is_align_right
                                name='expiry_time'
                                value={expiry_time}
                                placeholder='12:00'
                                start_date={start_date_time}
                                sessions={sessions}
                                is_nativepicker={is_nativepicker}
                            />
                        }
                    </div>
                </React.Fragment>
            }
        </Fieldset>
    );
};

// ToDo: Refactor Duration.jsx and date_picker.jsx
Duration.propTypes = {
    duration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    duration_unit      : PropTypes.string,
    duration_units_list: MobxPropTypes.arrayOrObservableArray,
    expiry_date        : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    expiry_time    : PropTypes.string,
    expiry_type    : PropTypes.string,
    is_minimized   : PropTypes.bool,
    is_nativepicker: PropTypes.bool,
    onChange       : PropTypes.func,
    server_time    : PropTypes.object,
    sessions       : MobxPropTypes.arrayOrObservableArray,
    start_date     : PropTypes.number,
    start_time     : PropTypes.string,
};

export default observer(Duration);
