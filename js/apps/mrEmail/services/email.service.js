import {
    storageService
} from './storage.service.js';
import {
    makeId
} from '../../../services/util.service.js';

export const emailService = {
    getEmails,
    getEmailById,
    removeEmail,
    countReadEmails,
    updateProp,
    getEmptyEmail,
    saveEmailAndStore,
    onSaveCurrEmail
}
var gEmails = []
const EMAILS_KEY = 'emails';

function getEmailById(emailId) {
    const res = gEmails.find(email => {
        return email.id === emailId
    });
    return Promise.resolve(res);
}

function removeEmail(id) {
    let idx = gEmails.findIndex(email => email.id === id);
    if (idx !== -1) gEmails.splice(idx, 1);
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve();
}

function updateProp(id, prop) {
    let idx = gEmails.findIndex(email => email.id === id);
    if (idx !== -1) {
        gEmails[idx].prop = true;
        gEmails.splice(idx, 1, gEmails[idx]);
    }
    storageService.store(EMAILS_KEY, gEmails);
}

function countReadEmails() {
    let res = 0;
    gEmails.forEach(email => {
        if (email.isRead) return res++;
    })
    return Promise.resolve(res);
}

function getEmails() {
    var emails = storageService.load(EMAILS_KEY);

    if (!emails) {
        emails = [createEmail('Welcome', 'Here in facebook blablabla', 'Mark'),
            createEmail('Pook review', 'Nice pook', 'Shosh'),
            createEmail('Holla Lola', 'Wanna marry me?', 'Faruk'),
        ];
    }
    window.emails = emails;
    gEmails = emails;
    storageService.store(EMAILS_KEY, emails);
    return Promise.resolve(emails);
}

function getEmptyEmail() {
    return {
        subject: null,
        body: null,
        from: null
    }
}

function createEmail(subject, body, from, isSentByMe) {
    return {
        id: makeId(),
        from,
        subject,
        body,
        isRead: false,
        isStarred: false,
        isSentByMe: isSentByMe || false,
        createdAt: Date.now()
    }
}

function saveEmailAndStore(subject, body, from) {
    let email = createEmail(subject, body, from, true);
    gEmails.unshift(email);
    storageService.store(EMAILS_KEY, gEmails);
}

function onSaveCurrEmail(email){
    storageService.store('curr-email', email);
}