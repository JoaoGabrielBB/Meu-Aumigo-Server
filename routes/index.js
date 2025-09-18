import express from "express";
import animais from "./animaisRoutes.js"




const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Testando essa merda"})

    })

    app.use(
        express.json(),
        animais
    )
}

export default routes