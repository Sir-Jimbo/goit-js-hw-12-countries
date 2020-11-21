export class CountdownTimer {

    constructor({ selector, targetDate }) {
this.refs = {
      timer: document.querySelector(selector),
      days: document.querySelector(`${selector} [data-value="days"]`),
      hours: document.querySelector(`${selector} [data-value="hours"]`),
      mins: document.querySelector(`${selector} [data-value="mins"]`),
      secs: document.querySelector(`${selector} [data-value="secs"]`),
    };
        this.selector = selector;
        this.date = targetDate;
        this.render();
        this.start();
    }

    countDate() {
        const time = new Date(this.date) - Date.now();
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);

        return { days, hours, mins, secs };
    }

    render() {
        const time = this.countDate();
        this.refs.days.textContent = String(time.days).padStart(2, '0');
        this.refs.hours.textContent = String(time.hours).padStart(2, '0');
        this.refs.mins.textContent = String(time.mins).padStart(2, '0');
        this.refs.secs.textContent = String(time.secs).padStart(2, '0');
    }

    start() {
        const deadline = Date.parse(this.date) <= Date.parse(new Date());
        this.timerId = setInterval(() => {
            if (deadline) {
                this.stop();
                return;
            }
            this.render();
        }, 1000);
    }

    stop() {
        clearInterval(this.timerId);
    }
}
