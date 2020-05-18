class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
        const persona = { id, nombre };

        this.personas.push(persona);

        return this.personas;
    }

    obtenerPersona(id) {
        const persona = this.personas.filter((persona) => persona.id === id)[0];

        return persona;
    }

    obtenerPersonas() {
        return this.personas;
    }

    // static obtenerPersonasPorSala(sala) {
    //     // ...
    // }

    borrarPersona(id) {
        const personaBorrada = this.obtenerPersona(id);

        // console.log('ANTES DE BORRAR', this.personas);

        this.personas = this.personas.filter((persona) => persona.id !== id);

        // console.log('DESPUÉS DE BORRAR', this.personas);
        return personaBorrada;
    }
}

module.exports = Usuarios;
