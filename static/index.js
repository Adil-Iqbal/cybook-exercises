function pad(n, width = 2, z = '0') {
    if (typeof n === 'number') n = n.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Controller {
    constructor(e) {
        this.set(e);
    }
    set(e) {
        this.e = Number(e);
        this.sel = `#exercise_${pad(this.e,)}`;
        this.render();
    }
    next() {
        this.set(this.e + 1);
    }
    render() {
        this.hideAll();
        this.show();
    }
    hideAll() {
        $("div[id^=exercise_]").addClass('d-none');
    }
    show() {
        $(this.sel).removeClass('d-none');
    }
}

$(document).ready(async function() {
    const app = new Controller(1);
    let stop = false;
    
    if (app.e === 1) {
        setTimeout(() => {
            $(app.sel).find('#searching').addClass('d-none');
            if (window.Cypress) {
                $(app.sel).find('#found').removeClass('d-none');
                setTimeout(() => app.next(), 300);
            } else {
                $(app.sel).find('#error').removeClass('d-none');
                stop = true;
            }
        }, 400);
    }

    if (stop) return;

    if (app.e === 2) {
        const config = window.Cypress.config();
        $(app.sel).find('#searching').addClass('d-none');
        if (config.hasOwnProperty('baseUrl') && config.baseUrl.includes('localhost:3000')) {
            $(app.sel).find('#found').removeClass('d-none');
            setTimeout(() => app.next(), 300);
        } else {
            $(app.sel).find('#error').removeClass('d-none');
            stop = true;
        }
    }

    if (stop) return;


});