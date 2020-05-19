class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        const persona = { id, nombre, sala };

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

    obtenerPersonasPorSala(sala) {
        const personasEnSala = this.personas.filter((persona) => persona.sala === sala);

        return personasEnSala;
    }

    borrarPersona(id) {
        const personaBorrada = this.obtenerPersona(id);

        // console.log('ANTES DE BORRAR', this.personas);

        this.personas = this.personas.filter((persona) => persona.id !== id);

        // console.log('DESPUÉS DE BORRAR', this.personas);
        return personaBorrada;
    }
}

module.exports = Usuarios;
