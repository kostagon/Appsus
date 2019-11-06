import {
    storageService
} from './storage.service.js';
import {
    makeId
} from '../../../services/util.service.js';

export const emailService = {
    getEmails,
    getEmailById,
    removeEmail
}

const EMAILS_KEY = 'emails';

function getEmailById(emailId) {
    const res = gEmails.find(email => {
        return email.id === emailId
    });
    return Promise.resolve(res);
}

function removeEmail(id) {
    var idx = gEmails.findIndex(email => email.id === id);
    if (idx !== -1) gEmails.splice(idx, 1)
    storageService.store(EMAILS_KEY, gEmails)
    return Promise.resolve();
}

function createEmail(subject, body) {
    return {
        id: makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now()
    }
}

var gEmails = []

function getEmails() {
    var emails = storageService.load(EMAILS_KEY);

    if (!emails) {
        emails = [createEmail('First Email', 'Hello', 'kosta'),
            createEmail('Second Email', 'Shalom', 'shlomi'),
            createEmail('Third Email', 'Want some coke?', 'koko'),
        ];
    }
    gEmails = emails;
    storageService.store(EMAILS_KEY, emails)
    return Promise.resolve(emails);
}