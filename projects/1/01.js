const vm = new Vue ({
    el: '#app',
    data: {
        titulo: "Tareas a Realizar",
        to_do_list: [
            {nombre: "Estudiar vue", avance: 0}, 
            {nombre: "EStudiar polygon", avance: 0}
        ],
        nueva_tarea: "",
        total_avance: 0
    },
    methods: {
        nuevaTarea () {
            //console.log("aaaay lmao")
            this.to_do_list.push({
                nombre: this.nueva_tarea,
                avance: 0
            });
            this.nueva_tarea = '';
        },
    },
    computed: {
        calcularAvance () {
            this.total_avance = 0;
            var contador = 0;
            for (avances of this.to_do_list) {
                this.total_avance += avances.avance;
                contador++;
            }
            return this.total_avance / contador;
        }, 
        color () {
            var total_actual = this.calcularAvance
            return {
                'bg-success' : total_actual >= 90,
                'bg-danger' : total_actual < 10,
                'bg-warning' : total_actual >=10 && total_actual < 90
            }
        }
    },
})  