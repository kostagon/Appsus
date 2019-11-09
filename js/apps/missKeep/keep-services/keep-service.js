'use strict';

import { storageService } from '../../../services/storage.service.js';
import { makeId } from '../../../services/util.service.js';

export const keepService = {
    getNotes,
    saveNote,
    createNote,
    removeNote,
    getNoteById,
    editNote
}

const KEEP_KEY = 'notes';

function editNote(note, newInfo) {
    switch (note.type) {
        case 'noteTxt':
            note.info.txt = newInfo;
            break;
        case 'noteImg':
            note.info.imgUrl = newInfo;
            break;
        case 'noteVid':
            note.info.vidUrl = newInfo;
            break;
        case 'noteTodo':
            newInfo = newInfo.split(',');
            newInfo = newInfo.reduce((acc, todo) => {
                acc.push({ txt: todo, isMarked: false })
                return acc;
            }, [])
            note.info.todos = newInfo;
            break;
    }
    saveNote(note);
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note);
}

function removeNote(noteId) {
    var idx = gNotes.findIndex(note => note.id === noteId);
    if (idx !== -1) gNotes.splice(idx, 1)
    storageService.store(KEEP_KEY, gNotes);
    return Promise.resolve();
}

function getNotes() {
    var notes = storageService.load(KEEP_KEY);
    if (!notes) {
        notes = gNotes;
        storageService.store(KEEP_KEY, notes)
    }
    gNotes = notes;
    return Promise.resolve(notes);
}

function saveNote(note) {
    // NEW NOTE
    if (!note.id) {
        note.id = makeId();
        gNotes.unshift(note);
    } else {
        // EXISTING NOTE
        const idx = gNotes.findIndex(currNote => currNote.id === note.id);
        gNotes.splice(idx, 1, note);
    }
    storageService.store(KEEP_KEY, gNotes);
    return Promise.resolve(note);
}

function createNote(type, val) {
    var valKey;
    if (type === 'noteTxt') valKey = 'txt'
    else if (type === 'noteImg') valKey = 'imgUrl'
    else if (type === 'noteVid') valKey = 'vidUrl'
    else if (type === 'noteTodo') {
        valKey = 'todos';
        val = val.split(',');
        val = val.reduce((acc, todo) => {
            acc.push({ txt: todo, isMarked: false })
            return acc;
        }, [])
    }
    var note = {
        type,
        info: {
            [valKey]: val,
            style: { backgroundColor: '#ffffff' },
            isPinned: false
        }
    }
    return note;
}


var gNotes = [
    {
        type: 'noteTxt',
        id: makeId(),
        info: {
            txt: 'please work please',
            style: { backgroundColor: 'red' },
            isPinned: true
        }
    },
    {
        type: 'noteImg',
        id: makeId(),
        info: {
            style: { backgroundColor: '#ffffff' },
            isPinned: false,
            imgUrl: 'https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png'
        }
    },
    {
        type: 'noteTodo',
        id: makeId(),
        info: {
            isPinned: false,
            style: { backgroundColor: '' },
            todos: [{ txt: 'code', isMarked: true }, { txt: 'sleep', isMarked: true }, { txt: 'code again', isMarked: false }]
        }
    },
    {
        type: 'noteImg',
        id: makeId(),
        info: {
            style: { backgroundColor: '' },
            imgUrl: 'https://thumbs.gfycat.com/IncredibleAshamedFreshwatereel-small.gif'
        }
    },
    {
        type: 'noteVid',
        id: makeId(),
        info: {
            style: { backgroundColor: '' },
            vidUrl: '//vjs.zencdn.net/v/oceans.mp4'
        }
    }
]