
import { CountdownTimer } from './plugin';

const timer = new CountdownTimer({
    selector: '#timer-1', 
    targetDate: new Date('Aug 6, 2021'),
});
