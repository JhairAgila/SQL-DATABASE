const dbCategoria = require("./dbCategoria")
const Categoria = require('./Categoria');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

/* TODO: Documentación con swagger */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.1" ,
            title: "API REST Categorias",
            description: "API REST Categorias",
            constact: {
                name: "AnderCode Developer"
            },
            server: ["http://localhost:8090"],
        }
    },
    apis: ['api.js']
};

// TODO: Documentaci[on con swagger y ruta]
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());
app.use(cors());

/**
 * @swagger
 * /api/categoria:
 *  get:
 *      description: Use para obtener todas las categorias
 *      responses:
 *          '200':
 *              description: Listado correctamente 
*/


//Get categorias
app.use('/api', router);
router.route('/categoria').get( (request, response) => {
    dbCategoria.getCategoria().then( result => {
        response.json(result[0]);
    })
});

/**
 * @swagger
 * /api/categoria/{id}:
 *  get:
 *      description: Use para obtener una categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          '200':
 *              description: Obtenido correctamente
 */
//Get categoria por ID

router.route('/categoria/:id').get( ( request, response) => {
    dbCategoria.getCategoria_x_id(request.params.id).then( result => {
        response.json(result[0]);
    });
});

/**
 * @swagger
 * /api/categoria/guardar:
 *  post:
 *      description: Use para guardar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                  cat_id: Id
 *                  car_nom: Nombre
 *                  cat_obs: Obs
 * 
 *      responses:
 *          '200':
 *              description: Guardado correctamente
 *          content: 
 *              application/json:
 *                  type: object
 */

router.route('/categoria/guardar').post( (request, response) => {
    let categoria = {...request.body};
    dbCategoria.insertCategoria(categoria).then( result => {
        response.json(result[0]);
    });
});

/**
 * @swagger
 * /api/categoria/actualizar:
 *  put:
 *      description: Use para actualizar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                  cat_id: Actualizar id
 *                  car_nom: Actualizar nombre
 *                  cat_obs: Actualizar obs
 *      responses:
 *          '200':
 *              description: Actualizado correctamente
 *          content: 
 *              application/json:
 *                  type: object
 */


router.route("/categoria/actualizar").put((request, response) => {
  let categoria = { ...request.body };
  dbCategoria.updateCategoria(categoria).then( result => {
    response.json(result[0]);
  });
});

/**
 * @swagger
 * /api/categoria/eliminar/{id}:
 *  delete:
 *      description: Use para eliminar una categoria por medio de id
 *      parameters:
 *          - in: path
 *            name: id
 *      responses:
 *          '200':
 *              description: Categoria eliminada
 */
router.route("/categoria/eliminar/:id").delete( (request, response) => {
    dbCategoria.deleteCategoria(request.params.id).then( result => {
        response.json(result[0]);
    });
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Categoria API iniciado en el puerto: ' + port); // Menssage stating the service     

