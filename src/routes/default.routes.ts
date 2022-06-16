import { Router } from "express";

const app = Router();

app.get('/', (req,res)=>{
    res.json({
        apiData: {
           version: 1.0,
           nombre: "KNOCK-API",
           author: "kevin bohorquez" 
          },
        routes: ["/notes", "/crypto", "/addon"],
        data: {
          github: "https://github.com/scyth3-c/knock-cpp-API",     
        },
        examples: {
          addon: [
            "/addon/compile",
            `await axios.post('https://api_url/addon/compile', source_code, {
              headers: {
                "Content-Type": "text/plain",
                title: 'mi_file',
                standar: "c++17",
                o: "1",
                flags: "-Wall",
                data: "10 kevin",
              },
            });`
          ]
        }
    
      });
});

module.exports = app;