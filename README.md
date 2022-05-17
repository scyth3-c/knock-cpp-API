 <div align="center"> 
   <img src="https://img.shields.io/static/v1?label=update in&message=A Week&color=success">
   <img src="https://img.shields.io/static/v1?label=version&message=1.0.0&color=green">
   <img src="https://img.shields.io/static/v1?label=licence&message=MIT&color=red">
   <img src="https://img.shields.io/static/v1?label=CONTRIBUTIONS&message=ALL WELCOME&color=green"> 
 </div>
 
 ## KNOCK API 
 
 ### Compile C++ everywhere
 
 _an API that serves to compile c++ or generate assembly code on the web, as well as manage notes, this API is the engine of the projects:_
 
- [scyth3-c/knock-cpp-online](https://github.com/scyth3-c/knock-cpp-online) <br>
- [scyth3-c/Vue-Electron-Port](https://github.com/scyth3-c/Vue-Electron-Port) <br/>
 
 Test API: 
  - [HEROKU](https://radiant-dusk-88409.herokuapp.com/) <br>
  - the API is host in a free service because the API has a time delay in activating
 
 
 
 <hr/>

<div align="center">  
  <img src="https://user-images.githubusercontent.com/52190352/168863015-edc58ff4-d110-42ef-b6a2-220931d6e71e.png" width="100px">
 
 _a unflat board API by scyth3-c_
 
</div>

<br/>
 
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
    
    <the url> /addon/compile
    <the url> /addon/download
    <the url> /addon/assembly
    
   <hr/>
       
    └─── Notes 
      - new
      - recollector
      - items
      - delete
      - show
      - last
      
      <the url> /notes/new
      <the url> /notes/recollector
      <the url> /notes/items
      <the url> /notes/delete
      <the url> /notes/show
      <the url> /notes/last
      
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
 
 
 
## Posibles Features

- include the rwnio api for htpp request, multi-platform
- http get 
- http post
- x-www-form-urlencoded
- realtime
- based in curl with a friendly interface
 
 By Scyth3-c



