 <div align="center"> 
   <img src="https://img.shields.io/static/v1?label=update in&message=Today&color=success">
   <img src="https://img.shields.io/static/v1?label=version&message=1.0.0&color=green">
   <img src="https://img.shields.io/static/v1?label=licence&message=MIT&color=red">
   <img src="https://img.shields.io/static/v1?label=CONTRIBUTIONS&message=ALL WELCOME&color=green"> 
 </div>
 
 ## COSENO SCYTHE KNOCK CPP  API 
 
 _an API that serves to compile c++ or generate assembly code on the web, as well as manage notes, this API is the engine of the projects:_
 
- [scyth3-c/knock-cpp-online](https://github.com/scyth3-c/knock-cpp-online) <br>
- [scyth3-c/Vue-Electron-Port](https://github.com/scyth3-c/Vue-Electron-Port) <br/>
 
 Test API: 
  - [HEROKU](https://radiant-dusk-88409.herokuapp.com/) <br>
  - the API is host in a free service because the API has a time delay in activating
 
 ### Struct 
 
 └───src <br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── c++<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;   └─── temp<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── connection<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── controller<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;   ├─── compatibility<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;   └─── promises<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── middleware<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── model<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;├─── routes<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;└─── server<br/>
    
   
 ### End Points
    
     └─── Addon
    - compile
    - download 
    - assembly
    
    /addon/compile
    
   <hr/>
       
    └─── Notes 
      - new
      - recollector
      - items
      - delete
      - show
      - last
      
      /notes/new
      
      <!-- without update, is so funny -->
   
    
   <hr/>
   
    └─── Crypto
    - sha256
      
    /crypto/sha256
  
  
  
 ### Arguments
 
  <hr/>
   
     └─── Addon
    - compile
      └─ POST
       - [body plain text]         [source code]
        └─ HEADERS    
         - title      ------------ [some title]
         - standar    ------------ [2a, 11, 14, 17]
         - o          ------------ [1, 2, 3]
         - flags      ------------ [-wall Etc.]
   
    - download 
    └─ POST
       - [body plain text]         [source code]
        └─ HEADERS
        - title      ------------- [Some title]                      
        
    - assembly
     └─ POST
       - [body plain text]          [source code]
        └─ HEADERS    
          - title      ------------ [some title]
          - standar    ------------ [2a, 11, 14, 17]
          - o          ------------ [1, 2, 3]
          - flags      ------------ [-wall Etc.]
         
         
   <hr/>
   
 
    └─── Notes 
    
        - new
          └─ POST 
              - nombre   --------- [some name]
              - conten   --------- [some content]
              - autor?
        
        - recollector
          └─ GET
            - null
          
        - items
          └─ POST
            - null
            
        - delete
          └─ DELETE
           - id          --------- ["61205b1f4968e20016bc4be6"] 
           
        - show
          └─ GET 
           - id          --------- ["61205b1f4968e20016bc4be6"] 
        
        - last
          └─ GTE
           - null
   
   <hr>
   
     └─── Crypto
       - sha256 
          └─ GET
            - plain     ---------- [ "SOME TEXT" ]
            - dg        --------------["hex", "base64"]
 
 
 
      
     
