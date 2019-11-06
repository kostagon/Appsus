'use strict';

import { storageService } from '../../../services/storage.service.js';

export const keepService = {
    getNotes
}

const KEEP_KEY = 'notes';

var gNotes = [
    {
        type: 'noteTxt',
        info: {
            createdAt: new Date().toJSON().slice(0,10),
            txt: 'please work please'
        }
    },
    {
        type: 'noteImg',
        info: {
            createdAt: new Date().toJSON().slice(0,10),
            imgUrl: 'https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png'
        }
    },
    {
        type: 'noteTodo',
        info: {
            createdAt: new Date().toJSON().slice(0,10),
            todos: ['code','sleep','code again']
        }
    }
]

function getNotes() {
    var notes = storageService.load(KEEP_KEY);
    if (!notes) {
        notes = gNotes;
        storageService.store(KEEP_KEY, notes)
    }
    gNotes = notes;
    return Promise.resolve(notes);
}
