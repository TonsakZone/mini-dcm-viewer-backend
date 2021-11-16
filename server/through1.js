const fs = require('fs')
var fileextens = '.dcm'; //file extension
var folderpath = '../images'; //directory
var make_dir=(path)=>{
    const alldata = [];
    fs.readdirSync(path).forEach(file=>{
        const id = `${path}/${file}`;
        const leaf = false;
        const node = {
            label: file,
            path: id,

        };
        if(!file.includes(fileextens)){ //not file is .dcm??
            node.key = `${path}/${file}`;
            node.nodes = make_dir(`${path}/${file}`);
        }else {
            node.key = `${path}/${file}`;
            node.isOpen = leaf;

        }

        alldata.push(node);
    })
    return alldata;
}

const dataarr = make_dir(folderpath);
var filedata = JSON.stringify(dataarr,null, 2);
fs.writeFileSync("./Directory2.json", filedata, (err) => {
    if (err) {
        throw err;
    }
})
console.log("JSON created");
