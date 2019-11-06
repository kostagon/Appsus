import {storageService} from './storage.service.js';
import {makeId} from './util.service.js';

export const emailService = {
    getEmails
}

const EMAILS_KEY = 'emails';

function createEmail(title, subject, from) {
    return {
        id: gId++,
        title,
        subject,
        from,
        createdAt: Date.now()
    }
}

function getEmails() {
    var emails = storageService.load(EMAILS_KEY)
    if(!emails) {
        emails = gEmails;
        storageService.store(EMAILS_KEY, emails)
    }
    gEmails = emails;
    return Promise.resolve(emails);
}


var gEmails = [
    createEmail('Hello', 'First Email', 'kosta'),
    createEmail('Shalom', 'Second Email', 'shlomi'),
    createEmail('Want some coke?', 'Third Email', 'koko'),
]