const { Router } = require('express')
const router = Router()
const admin = require('firebase-admin');
var cors=require('cors')
const db = admin.firestore();

//Para añadir
router.post('/api/products', async (req, res)=>{
   
    try {
        const {Nombre, Descripcion,Tipo,Imagen} = req.body;

        await db.collection("products").add({
            Nombre,
            Descripcion,
            Tipo,
            Imagen
        });
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
   
});

//Para obtener
router.get('/api/products/:product_id', async (req, res) => {
    try {
        const doc = db.collection('products').doc(req.params.product_id)
        const item = await doc.get()
        const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/api/products', async (req, res) => {
    try {
        const query = db.collection('products');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }))
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
});

router.delete('/api/products/:product_id', async (req, res) => {
    try {
        const document = db.collection('products').doc(req.params.product_id);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.put('/api/products/:product_id', async (req, res) => {
    try {
        const document = db.collection('products').doc(req.params.product_id)
        await document.update({
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});
module.exports = router