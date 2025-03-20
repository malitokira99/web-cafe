const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");

let conexion =mysql.createConnection({
    host: "localhost",
    database: "finca_cafetera",
    user: "root",
    
})
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Servir archivos estáticos desde la carpeta "vistas"
app.use(express.static(path.join(__dirname, 'views')));

// apis para inicio 
app.get('/', function (req, res) {
  
        res.render('inicio');
    });
    
    app.get('/finanzas', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
    const mes = req.params.mes;
    
    let query = 'SELECT * FROM datos_financieros ';
    let params = mes;
    conexion.query(query, params, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta');
            return;
        }
        res.json(results);
    });
});
    app.get('/datos/:mes', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
    const mes = req.params.mes;
    
    let query = 'SELECT * FROM datos_financieros WHERE mes = ?';
    let params = mes;
    conexion.query(query, params, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la consulta');
            return;
        }
        res.json(results);
    });
});


// apis para lotes
app.get("/lotes", function(req, res) {
    res.render("lotes");
});

app.post("/lotes", function(req, res) {
    const datos = req.body;
    console.log(datos);
    
    let nombre_lotel = datos.nombre_lote;
    let area_lotel = datos.area_lote;
    let tipo_cultivol = datos.tipo_cultivo;
    let variedadl = datos.variedad;
    let densidad_siembral = datos.densidad_siembra;
    let fecha_siembral = datos.fecha_siembra;
    
    let registrar  = "INSERT INTO lotes (nombre_lote, area_lote, tipo_cultivo, variedad,  densidad_siembra, fecha_siembra) VALUES ('"+ nombre_lotel +"','"+ area_lotel+"','"+ tipo_cultivol +"','"+variedadl +"' ,'"+ densidad_siembral+"', '"+fecha_siembral+"')";

    conexion.query(registrar,function(error){
if(error){
    throw error;
}else{
    console.log("datos almacenados corectamente");
    res.redirect("/lotes");
}
    });
});

//INICIO API EXPERIMENTAL
// Ruta para actualizar un registro parcial o totalmente
app.put('/actualizar-lote/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  const { nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra } = req.body;

  let campos = [];
  if (nombre_lote) campos.push(`nombre_lote = '${nombre_lote}'`);
  if (area_lote) campos.push(`area_lote = ${area_lote}`);
  if (tipo_cultivo) campos.push(`tipo_cultivo = '${tipo_cultivo}'`);
  if (variedad) campos.push(`variedad = '${variedad}'`);
  if (densidad_siembra) campos.push(`densidad_siembra = ${densidad_siembra}`);
  if (fecha_siembra) campos.push(`fecha_siembra = '${fecha_siembra}'`);

  if (campos.length === 0) {
    return res.status(400).send('No se proporcionaron campos para actualizar');
  }

  const sql = `UPDATE lotes SET ${campos.join(', ')} WHERE id = ${id}`;
  conexion.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send('Error al actualizar el lote');
    }
    res.send('Lote actualizado exitosamente');
  });
});
app.get('/lotesa', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sql = 'SELECT * FROM lotes';
    conexion.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send('Error al obtener los lotes');
      }
      res.json(result);
    });
  });
  
   // Define los orígenes aceptados
const ACCEPTED_ORIGINS = ["http://localhost:4000/lotes", "http://another-example.com"];
// Middleware para manejar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
// Middleware para manejar CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ACCEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

  //FIN API EXPERIMENTAL
//api para lotes
app.get('/fechasLotes', (req, res) => {
    conexion.query('SELECT id, nombre_lote FROM lotes', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.delete('/fechasLotes/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID no válido');
    }
    conexion.query('DELETE FROM lotes WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el registro');
            throw error;
        }
        res.send('Registro eliminado correctamente');
    }); 
});// fin api para lotes
// apis par inventario
app.get("/inventario", function(req, res){
    res.render("inventario");
});
app.post("/inventario", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const datos = req.body;
    console.log(datos);
    
    let tipoi = datos.tipo;
    let nombrei = datos.nombre;
    let codigo_asignadoi = datos.codigo_asignado;
    let fecha_comprai = datos.fecha_compra;
    let ubicacioni = datos.ubicacion;
    let cantidadi = datos.cantidad;
    let observacionesi = datos.observaciones;
    let registrar  = "INSERT INTO inventario (tipo, nombre, codigo_asignado, fecha_compra,  ubicacion, cantidad, observaciones) VALUES ('"+ tipoi +"','"+ nombrei+"','"+ codigo_asignadoi +"','"+fecha_comprai +"' ,'"+ ubicacioni+"', '"+cantidadi+"', '"+ observacionesi +"')";

    conexion.query(registrar,function(error){
if(error){
    throw error;
}else{
    console.log("datos almacenados corectamente");
    res.redirect("/inventario");
}
    });
});
//api para fechas inventario
app.get('/fechas', (req, res) => {
    conexion.query('SELECT id, nombre FROM inventario', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.delete('/fechas/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID no válido');
    }
    conexion.query('DELETE FROM inventario WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el registro');
            throw error;
        }
        res.send('Registro eliminado correctamente');
    });
}); 
// ruta para ctualizar parcial o totalmente el inventario
app.put('/actualizar-inventario/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    const { tipo, nombre, codigo_asignado, fecha_compra, cantidad, observaciones } = req.body;

    let campos = [];
    if (tipo) campos.push(`tipo = '${tipo}'`);
    if (nombre) campos.push(`nombre = '${nombre}'`);
    if (codigo_asignado) campos.push(`codigo_asignado = '${codigo_asignado}'`);
    if (fecha_compra) campos.push(`fecha_compra = '${fecha_compra}'`);
    if (cantidad) campos.push(`cantidad = '${cantidad}'`);

    if (campos.length === 0) {
        return res.status(400).send('No se proporcionaron campos para actualizar');
    }

    const sql = `UPDATE inventario SET ${campos.join(', ')} WHERE id = ${id}`;
    conexion.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send('Error al actualizar el lote');
        }
        res.send('Lote actualizado exitosamente');
    });
});

// fin api para fechas inventario
//api paraobtener datos de inventario
app.get('/obtenerInventario', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sql = 'SELECT * FROM inventario';
    conexion.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send('Error al obtener los lotes');
      }
      res.json(result);
    });
  });
  
//fin apis para inventario
//apis para ingresos y gastos
app.get("/ingresosVSgastos", function(req, res){
    res.render("ingresosVSgastos");
});
app.post("/ingresosVSgastos", function(req, res) {
    const datos = req.body;
    console.log(datos);
    
    let tipoc = datos.tipo;
    let conceptoc = datos.concepto;
    let cantidad_productoc = datos.cantidad_producto;
    let cantidad_pesosc = datos.cantidad_pesos;
    let fecha_registroc = datos.fecha_registro;

    let mesc = datos.mes;
    let semanac = datos.semana;
    let observacionesc = datos.observaciones;
    let registrar  = "INSERT INTO ingresos_gastos (tipo, concepto, cantidad_producto, cantidad_pesos,  fecha_registro,  mes,  semana,observaciones) VALUES ('"+ tipoc +"','"+ conceptoc+"','"+ cantidad_productoc +"','"+ cantidad_pesosc +"' ,'"+ fecha_registroc+"', '"+mesc +"' ,  '"+semanac+"', '"+ observacionesc +"')";

    conexion.query(registrar,function(error){
if(error){
    throw error;
}else{
    console.log("datos almacenados corectamente");
    res.redirect("/ingresosVSgastos");
}
    });
});

//api para fechas ingresos y gastos
app.get('/fechasIngresos', (req, res) => {
    conexion.query('SELECT id, fecha_registro FROM ingresos_gastos', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.delete('/fechasIngresos/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID no válido');
    }
    conexion.query('DELETE FROM ingresos_gastos WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el registro');
            throw error;
        }
        res.send('Registro eliminado correctamente');
    }); 
});// fin api para fechas ingrresos y gastos
//appi para actividades
app.get("/actividades", function(req, res){
    res.render("actividades");
});
app.post("/actividades", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const datos = req.body;
    console.log(datos);
    
    let nombre_actividadt = datos.nombre_actividad;
    let nombre_realizadort = datos.nombre_realizador;
    let insumo_utilizadot = datos.insumo_utilizado;
    let jornalest = datos.jornales;
    let fecha_realizaciont = datos.fecha_realizacion;
    let costo_totalt = datos.costo_total;
    let observacionest= datos.observaciones;
    let registrar  = "INSERT INTO actividades (nombre_actividad, nombre_realizador, jornales, insumo_utilizado,  fecha_realizacion, costo_total,observaciones) VALUES ('"+ nombre_actividadt +"','"+ nombre_realizadort+"','"+ jornalest +"','"+ insumo_utilizadot +"' ,'"+ fecha_realizaciont+"', '"+ costo_totalt+"', '"+observacionest +"' )";

    conexion.query(registrar,function(error){
if(error){
    throw error;
}else{
    console.log("datos almacenados corectamente");
    res.redirect("/actividades");
}
    });
});

//api para fechas actividades
app.get('/fechasActividades', (req, res) => {
    conexion.query('SELECT id, fecha_realizacion FROM actividades', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.delete('/fechasActividades/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID no válido');
    }
    conexion.query('DELETE FROM actividades WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el registro');
            throw error;
        }
        res.send('Registro eliminado correctamente');
    }); 
});// fin api para fechas actividades


app.listen(4000, function() {
    console.log("Servidor corriendo en http://localhost:4000");
});


