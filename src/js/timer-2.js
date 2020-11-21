import { CountdownTimer } from './plugin';

const timer = new CountdownTimer({
    selector: '#timer-2', 
    targetDate: new Date('Dec 31, 2020'),
});
