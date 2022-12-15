const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    const result = widgets.find(x => x.id == req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(result)
})

app.put('/widgets/:id', (req, res) => {
    const result = widgets.find(x => x.id == req.params.id)
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.name = req.body.name
    result.price = req.body.price
    res.status(200)
        .location('http://localhost:8080/widgets/' + result.id)
        .send(result)
})

app.delete('/widgets/:id', (req, res) => {
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    widgets.splice(req.params.id - 1, 1)
    res.status(204).send({error: "no content"})
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newWidget = {
        id: widgets.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('http://localhost:8080/widgets/' + newWidget.id).send(
        newWidget
    )
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})