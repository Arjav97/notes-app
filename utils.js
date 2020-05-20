const fs=require('fs')
console.log('utils.js');

const getNotes = () => {
    return 'Your notes were good' 
}

const addNote = (title , body) =>{
    const notes = loadNotes()

    const duplicateNote= notes.find((note)=>{
        return note.title === title
    })

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body       
        })
        saveNotes(notes)
        console.log('New note added!')
    } 
    else{
        console.log('Title taken')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
 
const loadNotes= ()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNote= (title)=>{
    const notes=loadNotes()
    const notestokeep= notes.filter((note) => {
        return note.title !== title
    })

    if(notes.length> notestokeep.length){
        saveNotes(notestokeep)
        console.log("Notes removed")
    }
    else{
        console.log("no note removed")
    }    
}

const listNote = () => {
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => {
         return note.title === title 
    })
   
    if(note){
        console.log(note.title)
        console.log(note.body)
    }
    else{
        console.log("Not found")
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote:readNote
}