var uuidv1 = require("uuidv1");
var fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        var notes = JSON.parse(fs.readFileSync("./db/db.json"));
        res.json(notes)
    }),

        app.post("/api/notes", function (req, res) {
            var note = req.body;
            var title = note.title;
            var text = note.text;
            var newNote = { title, text, id: uuidv1() }
            var notes = JSON.parse(fs.readFileSync("./db/db.json"));
            notes.push(newNote);
            fs.writeFileSync("./db/db.json", JSON.stringify(notes));
            res.json(newNote);

        }),
        app.delete("/api/notes/:id", function (req, res) {
            var noteId = req.params.id;
            var notes = JSON.parse(fs.readFileSync("./db/db.json"));
            var updateNotes = notes.filter(note => note.id !== noteId);
            fs.writeFileSync("./db/db.json", JSON.stringify(updateNotes));
            res.json({ ok: true });

        })
}