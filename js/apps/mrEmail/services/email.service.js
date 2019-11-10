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
    onSaveCurrEmail,
    getNoteFromStorage
}
var gEmails = []
const EMAILS_KEY = 'emails';
const NOTE_KEY = 'note';

function getNoteFromStorage(){
    var data = storageService.load(NOTE_KEY);
    return Promise.resolve(data)
}

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
            createEmail('The nookie', 'I did it all for the nookie', 'Nookie'),
            createEmail('Nice to meet you', 'Hi im puki Ben David', 'Puki'),
            createEmail('Uncle sam wants you!', 'Join the army now!', 'Rookie'),
            createEmail('IMPORTANT', 'Do you want to buy fireworks??', 'Booki'),
            createEmail('Child of parent', 'on what are you thinking?', 'Mooki'),
            createEmail('send bobs pls', 'Show vagene', 'Ganesh'),
            createEmail('Want to buy my shit?', 'it is very high quality?', 'Poopi'),
            createEmail('Come come', '?W?a?s?s?u?p?', 'Dicky'),
            createEmail('Beauty school', 'Push back the square', 'Chino'),
            createEmail('What is going on', '...', 'Chi Cheng (R.I.P)'),
            createEmail('Are you high?', 'Fabulous site!', 'Melissa'),
            createEmail('Lorem ipsum', 'Ma kore ahi?', 'Geva'),
            createEmail('Dolor sit amet', '??', 'Patrick'),
            createEmail('Excuse me sir?', 'Come discord', 'Tonio'),
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
    return Promise.resolve(email);
}

function onSaveCurrEmail(email){
    storageService.store('curr-email', email);
}