const fs = require ('fs')

class ContenedorArchivo {
    #elemento
    #ruta
    constructor(ruta){
        this.#elemento = []
        this.#ruta = ruta
    }

    async save(elemento){
        this.#elemento.push(elemento)
        await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#elemento))
    }

    async getById(number){
        const leerArchivo = await fs.promises.readFile(this.#ruta, 'utf-8')
        const arr = JSON.parse(leerArchivo)
        const arrId =  arr.find(el => number === el.id)
        return (arrId !== undefined)?arrId:null
    }

    async getAll(){
        this.#elemento = JSON.parse(await fs.promises.readFile(this.#ruta, 'utf-8'))
        return this.#elemento
    }

    async deleteById(number){
        const leerArchivo = await fs.promises.readFile(this.#ruta, 'utf-8')
        const arr = JSON.parse(leerArchivo)
        const posicion =  arr.findIndex(el => el.id === number)
        arr.splice(posicion,1)
        await fs.promises.writeFile(this.#ruta, JSON.stringify(arr))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.#ruta, '[]')
    }
}

async function test() {
    const rutaArchivo = './productos.txt'
    await fs.promises.writeFile(rutaArchivo, '[]')
    
    const contenedorDeProductos = new ContenedorArchivo(rutaArchivo)

    await contenedorDeProductos.save({
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1

    })

    await contenedorDeProductos.save({
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2

    })

    await contenedorDeProductos.save({
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3

    })

    //console.log(await contenedorDeProductos.getAll())
    
    //console.log(await contenedorDeProductos.getById(2))

    //await contenedorDeProductos.deleteById(1)

    //await contenedorDeProductos.deleteAll()

}

test()






