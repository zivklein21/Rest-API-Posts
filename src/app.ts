import initApp from "./server";
const port  = 3000;

initApp()
    .then((app)=>{
        app.listen(port, () =>{
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch(() => {
        console.log("Error fail starting server");
    });
